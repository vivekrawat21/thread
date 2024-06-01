"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Community from "../models/community.model";


interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string

}

export async function createThread({ text, author, communityId, path }: Params) {
console.log(communityId)
connectToDB();
   try {
    const  communityIdObject =await Community.findOne(
       {id :communityId},
       { _id:1 }
      );
   
     console.log("community id object"+communityIdObject)
 
     const createdThread = await Thread.create({
         text,
         author,
        community: communityIdObject || null,
     })
     // update the user model
 
     const user = await User.findByIdAndUpdate(author, {
         $push: {
             threads: createdThread._id
         }
     })
   if(communityIdObject){
      //update the community model
      await Community.findByIdAndUpdate(communityIdObject,{$push: {threads: createdThread._id},});
   }

     revalidatePath(path); //for revalidation of the path immediately it will refetch the path
   } catch (error: any) {
     throw new Error("Error in creating thread: " + error.message);
   }
}
export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB();

  //fetch the post that have no parents
  //calculate the number of posts to skip 
  const skipAmount = (pageNumber - 1) * pageSize;
  const postQuery = Thread.find({ parentId: { $in: [null, undefined] } }).sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ 
      path: "author", model: User })
    .populate({ 
      path: "community", model: Community }) // Add this line
    .populate(
      {
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id username parentId image"
        }
      });

  const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

  const posts = await postQuery.exec();

  const isNext = totalPostsCount > skipAmount+posts.length;

  return { posts, isNext };
}

export async function fetchThreadById(id: string) {
  connectToDB();
 try {
  //POPULATE THE COMMUNITY
   const thread = await Thread.findById(id)
     .populate({ 
      path: "author",
      model: User,
      select: "_id id name image"})
     
     .populate({
       path: "children",
       populate: [
        {
         path: "author",
         model: User,
         select: "_id name parentId image"
       },
       {
          path: "children",
         model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "_id name parentId image"
          }
        }
       
      ]
        
       }).exec();
       return thread;
     } 
     catch (error:any) {
        throw new Error("Error in fetching thread: " + error.message);
 }
}

export async function addCommentToThread(
  threadId:string,
  commentText:string,
  userId:string,
  path:string
){
connectToDB();
try {
  const originalThread = await Thread.findById(threadId);
  
  if(!originalThread) throw new Error("Thread not found");

  const commentThread = new Thread({
    text: commentText,
    author: userId,
    parentId: threadId,
  })
//  save the new thread
  const saveCommentThread = 
  await commentThread.save();
  
  //update the original thread
  originalThread.children.push(saveCommentThread._id);

  //save original thread
  await originalThread.save();

  revalidatePath(path);


} catch (error: any) {
  throw new Error("Error in adding comment to thread: " + error.message);
}
}
"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { model } from "mongoose";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string

}

export async function createThread({ text, author, communityId, path }: Params) {
   try {
     connectToDB();
 
     const createThread = await Thread.create({
         text,
         author,
       community: communityId,
     })
     console.log(createThread);
     // update the user model
 
     const user = await User.findByIdAndUpdate(author, {
         $push: {
             threads: createThread._id
         }
     })
     //  console.log(user.username);

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
    .populate({ path: 'author', model: User }).populate(
      {
        path: 'children',
        populate: {
          path: 'author',
          model: User,
          select: "_id name parentId image"
        }
      });

  const totalPostsCount = await Thread.countDocuments({ parentId: { $in: [null, undefined] } });

  const posts = await postQuery.exec();

  const isNext = totalPostsCount > skipAmount+posts.length;

  return { posts, isNext };
}
"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { FilterQuery, SortOrder } from "mongoose";
import Thread from "../models/thread.model";

interface Params {
    userId:string;
    username:string;
    name:string;
    bio:string;
    image:string;
    path:string;
}

export async function updateUser(
   { 
    userId,
    username,
    name,
    bio,
    image,
    path
   }:Params
    ): Promise<void> {
    connectToDB();
    // Update user
 try {
      const user = await User.findOneAndUpdate({
       id:userId
      },
      {
       username:username.toLowerCase(),
       name,
       bio,
       image,
       onboarded:true
   },
   {
       upsert:true //update and insert if not found
   }
      );
      if(path === '/profile/edit'){
       revalidatePath(path);
      }
 } catch (error:any) {
    throw new Error('failed to update and create user: ${error}')
 }
}

export async function fetchUser(userId:string) {
  try {
  
      // Fetch user
      const user =  await User.findOne({id:userId});
      connectToDB();
      return user;

  
  } catch (error:any) {
      throw new Error('failed to fetch user: ${error}')
    
  }
}


export async function fetchUserPosts(userId:string) {
  connectToDB();
    try {
      
      const thread = await User.findOne({id:userId}).populate(
        {
          path:'threads',
          model:'Thread',
          populate:{
            path:'children',
            model:'Thread',
            populate:{
            path:'author',
            model:'User',
            select:'id username name image',
            }
          }
          
        }
     
      );
      return thread;
       

    }catch (error:any) {
      throw new Error('failed to fetch user posts: ${error}')
    }
 }

export async function fetchUsers({ 
  userId:userId,
  searchString:searchString,
  pageNumber:pageNumber,
  pageSize:pageSize,
  sortBy = "desc",


}:
{
  userId:string;
  searchString:string;
  pageNumber:number;
  pageSize:number;
  sortBy:SortOrder;
}) {
  connectToDB();
  try {
    const skipAmount = (pageNumber-1) * pageSize;
    const regex = new RegExp(searchString, 'i');
    const query:FilterQuery<typeof User> = {
      id:{$ne:userId},
    }
    if(searchString.trim() !== ''){
      query.$or = [
        {username : {$regex:regex}},
        {name:{$regex:regex}}
      ]
    }

  const sortOptions = {createdAt:sortBy};

  const userQuery =  User.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize);

  const totalUsersCount =await User.countDocuments(query);
   
  const users = await userQuery.exec();

  const insNext = totalUsersCount > skipAmount + users.length;

  return {
    users,
    insNext
  }
  } catch (error:any) {
    throw new Error('failed to fetch users: ${error}')
  }
}
// Trying to resolve some errors





export async function getActivity (userId: string) {
  try{
    connectToDB();

    //find all the threads created by the user
    const userThreads = await Thread.find({author:userId})

    // collect all the child thread ids (replies) from the 'children' field
   const childThreadIds = userThreads.reduce((acc,userThread) => {
      return acc.concat(userThread.children)
    
   },[]) //collecting all the comment we get from the child thread ids

 
  const replies = await Thread.find({_id:{$in:childThreadIds},
    author:{$ne:userId},})
    .populate({
      path:'author',
      model:'User',
      select:'name image _id',
    
  })
return replies;

  }
  catch (error:any) {
    throw new Error(`failed to fetch activity: ${error.message}`)
  }
}

"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

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
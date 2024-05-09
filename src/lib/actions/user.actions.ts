"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import { json } from "stream/consumers";
import { stat } from "fs";

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
      console.log(user);
      if(path === '/profile/edit'){
       revalidatePath(path);
      }
 } catch (error:any) {
    throw new Error('failed to update and create user: ${error}')
 }
}

export async function fetchUser(userId:string) {
  try {
      connectToDB();
      // Fetch user
      const user =  await User.findOne({id:userId});
      console.log(user);
      return user;
      
  
  } catch (error:any) {
      throw new Error('failed to fetch user: ${error}')
    
  }
}
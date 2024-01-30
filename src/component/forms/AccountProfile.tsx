'use client'

import { userValidiation } from '@/lib/validations/user';
import {zodResolver} from '@hookform/resolvers/zod';
import React, { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  
  FormField,
  FormItem,
  FormLabel,
 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import * as z from "zod"
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea';
interface Props{
    user:{
        id:string;
        objectId:string;
        username:string;
        name:string;
        bio:string;
        image:any;
    };
    btnTitle:string;
}

export const AccountProfile = ({user,btnTitle}:Props) => {

  const form  = useForm({
    resolver: zodResolver(userValidiation),   //This package simplifies the work with form 
    defaultValues:{
      profile_photo:user?.image||'',
      name:user?.name||'',
      username:user?.username||'',
      bio:user?.bio||'',
    }
  });
 
  function onSubmit(values: z.infer<typeof userValidiation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  const  handleImage = (e: ChangeEvent, fieldChange:(value : string) => void) =>{
    e.preventDefault();
  }

  return (
    <Form {...form}>
    <form 
    className="flex flex-col justify-start gap-10"
    onSubmit={form.handleSubmit(onSubmit)}>
  
      <FormField
        control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem className='flex items-center gap-4'>
            <FormLabel className='account-form_image-label'>
           {field.value ?(
            <Image 
            src={field.value}
            alt = 'profile_photo'
            width = {36}
            height = {96}
            priority 
            className = "rounded-full object-contain"

            />
        )
        //todo:
        //adding the usename field to the clerk api
           :
           (
            <Image 
            src="/assets/profile.svg"
            alt = 'profile_photo'
            width = {24}
            height = {24}
            className = 'object-contain'
            />
          )
           } 
              </FormLabel>
            <FormControl className='flex-1 text-base-semibold text-gray-200 '>
              <Input type ='file' accept='image/' className='account-form_image-input' placeholder="upload a photo"
              onChange = {(e)=> handleImage(e , field.onChange)}
              {...field} />
            </FormControl>
          </FormItem>
        )}
      />

<FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className='flex gap-3 w-full flex-col'>
            <FormLabel className='text-base-semibold text-light-2 '>
           Name
              </FormLabel>
            <FormControl>
              <Input type = 'text' className='account-form_input no-focus' 

              {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className='flex flex-col gap-3 w-full'>
            <FormLabel className='text-base-semibold text-light-2 '>
           Username
              </FormLabel>
              <FormControl>
              <Input type = 'text' className='account-form_input no-focus' 

              {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem className='flex flex-col gap-3 w-full'>
            <FormLabel className='text-base-semibold text-light-2 '>
           Bio
              </FormLabel>
            <FormControl className='flex-1 text-base-semibold text-gray-200 '>
             <Textarea 
             rows={10}
             className='account-form_input no-focus'
             {...field}
             />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit" className='bg-primary-500'>Submit</Button>
    </form>
  </Form>
  
  )
}

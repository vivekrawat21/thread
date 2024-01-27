'use client'

import { userValidiation } from '@/lib/validations/user';
import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import * as z from "zod"
interface Props{
    user:{
        id:string;
        objectId:string;
        usernames:string
        name:string;
        bio:string;
        image:string;
    };
    btnTitle:string;
}

export const AccountProfile = ({user,btnTitle}:Props) => {

  const form  = useForm({
    resolver: zodResolver(userValidiation),   //This package simplifies the work with form 
    defaultValues:{
      profile_photo:'',
      name:'',
      username:'',
      bio:''
    }
  });
 
  function onSubmit(values: z.infer<typeof userValidiation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

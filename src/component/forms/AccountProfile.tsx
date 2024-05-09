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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter, usePathname } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";
interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

export const AccountProfile = ({ user, btnTitle }: Props) => {
  //Implementing the default image thing for the user coming from the github and simple
  const [files, setFiles] = React.useState<File[]>([]);
  const {startUpload} = useUploadThing("media"); //This is the file router that we have created in the uploadthing/core.ts file

  const router = useRouter();
  const path = usePathname();

  const form = useForm({
    resolver: zodResolver(userValidiation), //This package simplifies the work with form
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });

  async function  onSubmit(values: z.infer<typeof userValidiation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //This will only submit if the validations is true

    const blob = values.profile_photo;

    const  hasImageChanged = isBase64Image(blob); //comes from utils utility functions which are comes from the utils.ts file

    if (hasImageChanged) {
      //This is happening when the image is changed
      //upload the image to the server
      // const image = await uploadImage(blob);
      // values.profile_photo = image;
      const imageRes = await startUpload(files);
      if (imageRes && imageRes[0].url) {
        values.profile_photo = imageRes[0].url;
      }
    }
    // console.log(values);

    //TODO: Update user profile in database
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: path,
    });
    if (path === "/profile/edit") {
     router.back();
    }
    else{
      router.push("/");
    }
  }
  

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault(); //prevent the default action of browser reloading the page

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;

      fileReader.onload = async (e) => {
        const imageDataUrl = e.target?.result?.toString() || "";

        fieldChange(imageDataUrl); //This will change the image url in the form because of react hook form
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profilephoto"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  //todo:
                  //adding the usename field to the clerk api
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_photo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Input
                  type="file"
                  accept="image/*"
                  className="account-form_image-input"
                  placeholder="upload a photo"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex gap-3 w-full flex-col">
              <FormLabel className="text-base-semibold text-light-2 ">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2 ">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-base-semibold text-light-2 ">
                Bio
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200 ">
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  );
};

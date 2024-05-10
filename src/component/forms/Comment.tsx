"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useRouter, usePathname } from "next/navigation";

// import { updateUser } from "@/lib/actions/user.actions";

import { commentValidiation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}
const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
  // const router = useRouter();
  const path = usePathname();

  
  const onSubmit = async (values: z.infer<typeof commentValidiation>) => {
   await addCommentToThread(threadId, values.thread, currentUserId, path);
    form.reset();
  
  };

  const form = useForm({
    resolver: zodResolver(commentValidiation), //This package simplifies the work with form
    
    defaultValues: {
      thread: "",
      accountId: currentUserId,
    },
  });
  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit) } typeof="submit">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="profile-image"
                  width={48}
                  height={48}
                  className="rounded-full cursor-pointer object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};
export default Comment;

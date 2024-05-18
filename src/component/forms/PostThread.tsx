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
import { Textarea } from "@/components/ui/textarea";
import { useRouter, usePathname } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";


// import { updateUser } from "@/lib/actions/user.actions";

import { threadValidiation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

function PostThread({userId}: {userId:string}) {
  const router = useRouter();
  const path = usePathname();
  const organization = useOrganization();
  
  const onSubmit = async (values: z.infer<typeof threadValidiation>) => {
    if (!organization) {
      const thread = await createThread({
        text: values.thread,
        author: values.accountId,
        communityId: organization?organization.id: null,
        path,
      });
      
    } 
    router.push("/");
    };
    


  const form = useForm({
    resolver: zodResolver(threadValidiation), //This package simplifies the work with form
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2 ">
                  Content of the thread
                </FormLabel>
                <FormControl className=" mt-10 no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={15} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500">
            Post Thread
          </Button>
        </form>
      </Form>
    </>
  );
}

export default PostThread;

// 'use client'
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/component/cards/ThreadCard";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
export default async function Home() {
  const result = await fetchPosts(1,30);

  // console.log(result.posts)
  const user = await currentUser();
  const userInfo = await fetchUser(user?.id||"");
  if (!userInfo?.onboarded) {
    return redirect("/onboarding");
  }
  return (
    <>
    <h1 className="head-text text-left mb-5">Home</h1>
    <section>
      {result.posts.length===0? <p>No posts</p> : (<>
      {result.posts.map((post:any) => (
        <ThreadCard
          key={post._id}
          id={post._id}  // console.log("hellp"+author.id);
          currentUserId= {user?.id||""}
          parentId={post.parentId}
          content = {post.text}
          author = {post.author}
          createdAt = {post.createdAt}
          community = {post.community}
          comments = {post.children} 
           
        />     
      ))}
      </>
      )
      }
    </section>

    </>
  )
}

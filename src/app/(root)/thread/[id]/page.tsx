import ThreadCard from "@/component/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Comment from "@/component/forms/Comment";


const page = async({params}:{params:{id:string}}) => {  
    if(!params.id) return null

    const user = await currentUser();
    if(!user) return null

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding')

   const thread = await fetchThreadById(params.id);   
     
    return (
        <section className="rleative">
        <div>
        <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId= {user?.id||""}
            parentId={thread.parentId}
            content = {thread.text}
            author = {thread.author}
            createdAt = {thread.createdAt}
            community = {thread.community}
            comments = {thread.children} 
        />  
        </div>
        <div className="mt-7">
          <Comment threadId = {thread.id} 
          currentUserImg={userInfo.image}
          currentUserId={userInfo._id.toString()}
          />

        </div>
        <div className="mt-10">
          {thread.children.map((childItem: any)=>(
            <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId= {user?.id||""}
            parentId={childItem.parentId}
            content = {childItem.text}
            author = {childItem.author}
            createdAt = {childItem.createdAt}
            community = {childItem.community}
            comments = {childItem.children} 
            isComment
            />
          ))}
        </div>
        </section>
    );
}
export default page;
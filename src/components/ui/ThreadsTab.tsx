import ThreadCard from "@/component/cards/ThreadCard";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import {redirect}  from "next/navigation"

interface Props{
    currentUserId: string;
    accountType: string;
    accountId: string;
    
}
const ThreadsTab = async({ currentUserId, accountType,accountId }:Props) => {
let result = await fetchUserPosts(accountId);
console.log(result.name);
if(!result){
    redirect('/');

}


    return (
    <section className="mt-9 flex flex-col gap-10">
       {
        result.threads.map((thread:any) => (
        
           <ThreadCard 
              key={thread.id}
                id={thread._id}
                currentUserId={currentUserId}
                parentId={thread.parentId}
                content={thread.text}
                author={
                    accountType === 'User'
                    ?{name: result.name, id: result.id, image: result.image}: {name: thread.author.name ,id: thread.author.id, image: thread.image}
                } //todo whether we the author or not
                createdAt={thread.createdAt}
                community={thread.community} //todo
                comments={thread.children}
                isComment={false}
           
           />
        ))
       }
     </section>
    )

}

export default ThreadsTab;

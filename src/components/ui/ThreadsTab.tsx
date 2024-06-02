import ThreadCard from "@/component/cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import {redirect}  from "next/navigation"

interface Props{
    currentUserId: string;
    accountType: string;
    accountId: string;
    
}
const ThreadsTab = async({ currentUserId, accountType,accountId }:Props) => {
    let result:any;
    
    if(accountType === 'Community'){
        result = await fetchCommunityPosts(accountId);
    }
    else if(accountType === 'User'){
        result = await fetchUserPosts(accountId);
    }

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
                ? {name: result.name, id: result.id, image: result.image}
                : {name: thread.author.name, id: thread.author.id, image: thread.author.image} // Corrected this line
            }
            createdAt={thread.createdAt}
            community={
                accountType === 'User'
                ? thread.community
                : {name: result.name, id: result.id, image: result.image}
            }
            comments={thread.children}
            isComment={false}
        />
        ))
       }
     </section>
    )

}

export default ThreadsTab;

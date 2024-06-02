import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import ProfileHeader from "@/component/shared/ProfileHeader";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/ui/ThreadsTab";
import UserCard from "@/component/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/component/cards/CommunityCard";

const Page = async () => {
  

  const user = await currentUser();
  if (!user) {
    return null;
  }
  

  
  //TODO: Add your own logic here
  const userInfo:any = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    return redirect("/onboarding");
  }

  //Fetch communities
    const results = await fetchCommunities(
    {
        searchString: "",
        pageNumber: 1,
        pageSize: 25,
        sortBy: "desc",
    }
    );
    return(
    <section >
        <h1 className="head-text mb-10"> 
        Search
        </h1>
        {/* searchBar */}
        <div className="mt-14 flex flex-col gap-9">
            
            {    results.communities.length ===0?(
                    <p className="no-result">
                        No users
                    </p>
                ) : 
                <>
                {results.communities.map((community) => (
                    <CommunityCard
                    key={community.id}
                    id={community.id}
                    name={community.name}
                    username={community.username}
                    imgUrl={community.image}
                    bio = {community.bio}
                    members = {community.members}
                    
                    />
                ))}
                </>}
            
            

        </div>
    </section>
    )
}
export default Page;
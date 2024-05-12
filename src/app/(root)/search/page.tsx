import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import ProfileHeader from "@/component/shared/ProfileHeader";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/ui/ThreadsTab";
import UserCard from "@/component/cards/UserCard";

const Page = async () => {
  

  const user = await currentUser();
  if (!user) {
    return null;
  }
  

  
  //TODO: Add your own logic here
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    return redirect("/onboarding");
  }

  //Fetch all users
    const results = await fetchUsers(
    {
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 125,
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
            
            {    results.users.length ===0?(
                    <p className="no-result">
                        No users
                    </p>
                ) : 
                <>
                {results.users.map((person) => (
                    <UserCard
                    key={person.id}
                    id={person.id}
                    username={person.username}
                    imgUrl={person.image}
                    name = {person.name}
                    personType = 'User'
                    />
                ))}
                </>}
            
            

        </div>
    </section>
    )
}
export default Page;
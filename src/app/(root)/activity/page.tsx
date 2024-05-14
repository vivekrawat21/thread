import { redirect } from "next/navigation";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import ProfileHeader from "@/component/shared/ProfileHeader";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/ui/ThreadsTab";
import UserCard from "@/component/cards/UserCard";
import Link from "next/link";


const Page = async () => {
  

  const user = await currentUser();
  if (!user) {
    return null;
  }
  

  
  const userInfo:any = await fetchUser(user.id);


  if (!userInfo?.onboarded) {
    return redirect("/onboarding");
  }
  
//   activity fetching
const activity = await getActivity(userInfo._id);


    return(
    <section>
        <h1 className="head-text mb-10">
        Activity
        </h1>

        <section className="mt-10 flex flex-col gap-5">
        {activity.length>0?(
            activity.map((activity:any)=>(
               <>
               <Link
               key={activity._id}
               href={`/thread/${activity.parentId}`}
              
               >
                <article className="activity-card">
                    <Image
                    src={activity.author.image}
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                    alt="Profile picture"
                   / >
                    <p className="!text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                            {activity.author.name}

                        </span>{" "}
                        replied to your thread{" "}
                    </p>

                  
                </article>
               </Link>
               </> 
            ))
        ):<p className="!text-base-regular text-light-3">No activity yet</p>}

        </section>
    </section>
    )
}
export default Page;
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/component/shared/ProfileHeader";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/ui/ThreadsTab";

const Page = async ({params}:{params:{id:string}}) => {
  

  const user = await currentUser();
  if (!user) {
    return null;
  }
  

  
  //TODO: Add your own logic here
  const userInfo:any = await fetchUser(params.id);
  if (!userInfo?.onboarded) {
    return redirect("/onboarding");
  }

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user?.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo?.image}
        bio={userInfo.bio}
      
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full ">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger  value={tab.value} key={tab.label} className="tab"
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-cover"

                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" &&(
                  <p className="m-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-ligt-2">
                    {userInfo.threads?.length}

                  </p>
                ) }
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab)=>(
            <TabsContent value={tab.value} key={`content-${tab.label}`}
            className="w-full text-light-1"
            >
              <ThreadsTab
                currentUserId={user.id}
                accountType='User'
                accountId={userInfo.id}
                
                
              />
            </TabsContent>
          
          ))}
        </Tabs>
      </div>
    </section>
  );
};
export default Page;

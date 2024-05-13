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
  

  
  const userInfo = await fetchUser(user.id);

  //getActivity

  if (!userInfo?.onboarded) {
    return redirect("/onboarding");
  }
    return(
        <div>
            <h1>Activities</h1>
        </div>
    )
}
export default Page;
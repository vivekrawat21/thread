
import { AccountProfile } from "@/component/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
interface user{
    id:string
    objectId:string
    username:string
    bio:string
    image:string
    name:string
}

async function Page() {
    const user =  await currentUser();  //This is a function from the clerk...
    if(!user){
        return null;
    }

    const userInfo = await fetchUser(user?.id);
    if (userInfo?.onboarded) {
        return redirect("/");
    }

    const userData:user = {
        id:user?.id||"",  //id of the current logged in user and the ._id is the object id in the data
       objectId:userInfo?._id||"",
       username:userInfo? userInfo?.username : user?.username,
       name: userInfo ?userInfo?.name  :user?.firstName ,
       bio :userInfo ? userInfo?.bio :"",
       image: userInfo ? userInfo?.image : user?.imageUrl,

    }
    const data = JSON.parse(JSON.stringify(userData));
    return(
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
        <h1 className="head-text">onboarding</h1>
        <p className="mt-3 text-base-regular
        text-light-2">
            change your username
        </p>
        <section className="mt-9 bg-dark-2 p-10">
            {/* In this section we are using clerk for the functionality */}

            <AccountProfile
             user={data}
             btnTitle ='Continue'
             />

        </section>
        </main>
    )
}
export default Page;
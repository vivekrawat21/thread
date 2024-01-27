import { AccountProfile } from "@/component/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";
async function Page() {
    const user = await currentUser();  //This is a function from the clerk...
    
    const userInfo = {};
    const userData = {
        id:user?.id,  //id of the current logged in user and the ._id is the object id in the database
        objectId:userInfo?._id,
       username: userInfo?.username || user?.username,
       name: userInfo?.name || user?.firstName ||"",
       bio :userInfo?.bio ||"",
       image: userInfo?.image || user?.imageUrl,

    }
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
             user={userData} 
             btnTitle ='Continue'
             />

        </section>
        </main>
    )
}
export default Page;
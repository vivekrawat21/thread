import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/component/forms/PostThread";
async function page() {
  const user = await currentUser();

  if (!user) {
    return null; //clerk will automatically redirect to login
  }
  //TODO: Add your own logic here
  const userInfo = await fetchUser(user.id);
  
  if (!userInfo?.onboarded) {
    return redirect("/onboarding");
  }
 
const Id = JSON.parse(JSON.stringify(userInfo._id));

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId = {Id} />
    </>
  );
}
export default page;

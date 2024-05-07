import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
async function page() {
  const user = await currentUser();

  if (!user) {
    return null; //clerk will automatically redirect to login
  }
  //TODO: Add your own logic here
//   const userInfo = await fetchUser(id:userId); 

  return (
    <div>
      <h1 className="head-text">Create Thread</h1>
    </div>
  );
}
export default page;

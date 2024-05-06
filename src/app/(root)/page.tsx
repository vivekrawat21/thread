import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="head-text text-left">
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
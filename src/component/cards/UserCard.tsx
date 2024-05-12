"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface Props {
    id: string;
    username: string;
    imgUrl: string;
    name: string;
    personType: string;

}

function UserCard(
    { id, username, imgUrl, name, personType }:Props
    
) {
    const router = useRouter();
  return (
    <article className="user-card">
        <div className="user-card_avatar">
            <Image src={imgUrl} alt="logo" width={48} height={48}
            className="rounded-full"
            />
            <div className="flex-1 text-ellipsis">
                <h4 className="text-base-semibold text-light-1">
                    {name}
                    <p className="text-small-medium text-gray-1">
                    @{username}
                    </p>
                </h4>

            </div>
        </div>
        <Button className="user-card_btn" onClick={()=>router.push(
            `/profile/${id}`
            )}>
            View
        </Button>

    </article>
  )
}

export default UserCard
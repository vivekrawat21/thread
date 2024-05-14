import Link from "next/link";
import Image from "next/image";
interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  createdAt: string;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean; //not required
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  community,
  comments,
  isComment = undefined,
}: Props) => {

  return (
    <article className={`flex w-full flex-col rounded-xl ${isComment? 'px-0 xs:px-7 mb-4':'bg-dark-2 p-7 mb-10'}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile-image"
                fill
                className="rounded-full cursor-pointer"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>
            <div className={` flex flex-col gap-3 ${isComment? 'mb-10':''}`}>
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-filled.svg"
                  alt="heart-filled"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                  
                />
              </div>
          {/* A thread is a comment and a comment is a thread */}
          {isComment && comments.length > 0 && (
            <Link href={`/thread/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} replies</p>
              </Link>
          )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ThreadCard;

import Image from "next/image";
import { sans, silkscreen } from "@/app/fonts";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";

interface PostProps {
  post: Prisma.PostGetPayload<{
    include: {
      user: true;
    };
  }>;
  liked: boolean;
  likeDispatch?: (payload: any) => void;
}
export async function Post({
  post: { content, subject, likes, user },
  liked,
  likeDispatch,
}: PostProps) {
  const { username, avatar } = user;
  return (
    // TODO: Add Diasy UI border color
    <div
      className={`post-body border border-base-300 p-4 bg-base-100 h-[500px] md:h-[300px] flex`}
    >
      <div className="flex flex-col md:flex-row gap-7 flex-grow">
        <div className="avatar justify-center items-center">
          <div className="rounded-full w-24 h-24">
            <Image
              src={avatar}
              alt="Avatar of post creator"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className={`flex flex-col gap-5 flex-1 justify-between`}>
          <div className="flex flex-col gap-2">
            <p className={`${sans.className}`}>{username}</p>
            <p className={`text-2xl leading-5 ${silkscreen.className}`}>
              {subject}
            </p>
          </div>
          <p
            className={`text-base leading-5 ${sans.className} overflow-auto grow h-[130px]`}
          >
            {content}
          </p>
          <div className="flex items-center gap-3">
            {/* TODO: Add like function via a button element */}
            <form action={likeDispatch?.bind(null, { liked, user })}>
              <button type="submit">
                {liked ? (
                  <HeartIconSolid
                    className="text-red-500"
                    width={24}
                    height={24}
                  />
                ) : (
                  <HeartIconOutline
                    className="text-base-content"
                    width={24}
                    height={24}
                  />
                )}
              </button>
            </form>
            <span className={`${silkscreen.className}`}>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

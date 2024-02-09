import Image from "next/image";
import { sans, silkscreen } from "@/app/fonts";
import { Prisma } from "@prisma/client";
import { getLiked, getNumberOfLikes } from "@/app/lib/actions";
import LikeButton from "../Post/LikeButton";
import { auth } from "@/auth";

interface PostProps {
  post: Prisma.PostGetPayload<{
    include: {
      author: true;
    };
  }>;
}
export async function Post({ post }: PostProps) {
  const session = await auth();
  let liked = false;
  if (session && session.user && session.user.email) {
    const email = session?.user?.email;
    liked = await getLiked(email, post.id);
  }
  const likes = await getNumberOfLikes(post.id);
  const {
    author: { image: avatar, username },
    title,
    content,
  } = post;
  return (
    // TODO: Add Diasy UI border color
    <div
      className={`post-body border border-base-300 p-4 bg-base-100 h-[500px] md:h-[300px] flex`}
    >
      <div className="flex flex-col md:flex-row gap-7 flex-grow">
        <div className="avatar justify-center items-center">
          <div className="rounded-full w-24 h-24">
            <Image
              src={avatar || "/default-avatar.png"}
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
              {title}
            </p>
          </div>
          <p
            className={`text-base leading-5 ${sans.className} overflow-auto grow h-[130px]`}
          >
            {content}
          </p>
          <div className="flex items-center gap-3">
            {/* TODO: Add like function via a button element */}
            <LikeButton liked={liked} postId={post.id} />
            <span className={`${silkscreen.className}`}>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Press_Start, sans, silkscreen } from "../../fonts";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

interface PostProps {
  avatar: string;
  subject: string;
  content: string;
  hearts: number;
  liked: boolean;
}
export async function Post({
  avatar,
  subject,
  content,
  hearts,
  liked,
}: PostProps) {
  return (
    // TODO: Add Diasy UI border color
    <div
      className={`post-body border border-base-300 p-4 bg-base-100 md:h-[240px] flex`}
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
          <p className={`text-2xl leading-5 ${silkscreen.className}`}>
            {subject}
          </p>
          <p
            className={`text-base leading-5 ${sans.className} overflow-auto h-[130px]`}
          >
            {content}
          </p>
          <div className="flex items-center gap-3">
            {/* TODO: Add like function via a button element */}
            {liked ? (
              <HeartIconSolid className="text-red-500" width={24} height={24} />
            ) : (
              <HeartIconOutline
                className="text-base-content"
                width={24}
                height={24}
              />
            )}
            <span className={`${silkscreen.className}`}>{hearts}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

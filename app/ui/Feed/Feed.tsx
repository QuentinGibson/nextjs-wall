import { Prisma } from "@prisma/client";
import { Post } from "../Post/Post";
interface FeedProps {
  posts: Prisma.PostGetPayload<{ include: { author: true } }>[] | [];
}
export default async function Feed({ posts }: FeedProps) {
  return posts.length === 0 ? (
    <h1>No posts to show. Share the first post!</h1>
  ) : (
    <div className="w-full grid md:grid-cols-2 gap-3 py-3 px-8">
      {posts.map((post, index) => {
        return <Post post={post} key={index} />;
      })}
    </div>
  );
}

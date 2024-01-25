import { Post } from "../Post/Post";
interface FeedProps {
  posts: PostData[];
}
export default async function Feed({ posts }: FeedProps) {
  return (
    <div className="w-full grid md:grid-cols-2 gap-3 py-3 px-8">
      {posts.map((post) => {
        const { id, subject, content, hearts, liked, avatar } = post;
        return (
          <Post
            key={id}
            subject={subject}
            content={content}
            hearts={hearts}
            liked={liked}
            avatar={avatar}
          />
        );
      })}
    </div>
  );
}

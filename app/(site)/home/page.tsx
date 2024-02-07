import { silkscreen } from "../../fonts";
import { getPosts } from "../../lib/actions";
import Feed from "@/app/ui/Feed/Feed";

export default async function HomePage() {
  const { status, posts, errors } = await getPosts();
  if (errors) {
    console.error(errors);
  }

  return (
    <div className={`${silkscreen.className} flex flex-col items-center gap-5`}>
      <h1 className="text-2xl">To the entire coding Community. Thank you!</h1>
      {status === "success" ? (
        posts.length > 0 ? (
          <Feed posts={posts} />
        ) : (
          <p className="text-lg">No posts available! Make the first one!</p>
        )
      ) : (
        <p className="text-lg">Oops! I could not get the posts! Try again!</p>
      )}
    </div>
  );
}

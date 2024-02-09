import { silkscreen } from "../../fonts";
import { getPosts } from "../../lib/actions";
import Feed from "@/app/ui/Feed/Feed";

export default async function HomePage() {
  const { status, posts, errors } = await getPosts();
  if (errors) {
    console.error(errors);
  }

  return (
    <main>
      <div>
        <div
          className={`${silkscreen.className} flex flex-col items-center gap-5`}
        >
          <h1 className="text-2xl">
            To the entire coding Community. Thank you!
          </h1>
          {posts && <Feed posts={posts} />}
        </div>
      </div>
    </main>
  );
}

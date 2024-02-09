import { getPostsByUser, getUserByEmail } from "@/app/lib/actions";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  const sessionUser = session?.user;
  const user = await getUserByEmail(sessionUser?.email || "");
  const posts = await getPostsByUser(user?.id || "");
  return (
    <main>
      <div className="px-2 sm:px-4 md:px-6">
        <div className="flex gap-8 items-center">
          <h1 className="text-3xl font-bold">Profile</h1>

          <Link className="btn btn-primary" href={"/editprofile"}>
            Edit Profile
          </Link>
        </div>
        <div>
          <div className="avatar">
            <div className="w-24 h-24 rounded-full">
              <Image
                alt="User select avatar"
                src={user?.image || "/default-avatar.png"}
                fill
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div>
            <h2 className="text-xl font-bold">User Information</h2>
            <div>
              <p>
                <strong>Username:</strong> {user?.username}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
          </div>
        </div>
        <section className="mt-24">
          <h1 className="text-2xl font-bold">Posts</h1>
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <Link href={`/editpost/${post.id}`}>Edit</Link>
                <form action={`/api/deletepost/${post.id}`}>
                  <input type="submit" value="Delete" />
                </form>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

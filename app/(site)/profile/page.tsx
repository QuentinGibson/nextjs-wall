import { deletePost, getPostsByUser, getUserByEmail } from "@/app/lib/actions";
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
        <div className="grid md:grid-cols-[1fr_3fr]">
          <section className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
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
              <h1 className="text-3xl font-bold">Profile</h1>
              <div>
                <Link className="btn btn-primary" href={`/editprofile`}>
                  Edit Profile
                </Link>
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
          </section>
          <section className="mt-24 sm:mt-0">
            <div className="grid gap-8 ">
              <h1 className="text-2xl font-bold md:text-center">Posts</h1>
              <div className="flex flex-wrap gap-4 md:justify-center">
                {posts.map((post) => (
                  <div
                    className="card w-96 bg-base-100 shadow-xl"
                    key={post.id}
                  >
                    <div className="card-body">
                      <div className="flex flex-col gap-2">
                        <h2 className="card-title">{post.title}</h2>
                        <p>{post.content}</p>
                        <div className="card-actions justify-end gap-3">
                          <Link
                            className="text-info"
                            href={`/editpost/${post.id}`}
                          >
                            Edit
                          </Link>
                          <form className="text-error" action={deletePost}>
                            <input
                              type="hidden"
                              name="postId"
                              value={post.id}
                            />
                            <button type="submit">Delete</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

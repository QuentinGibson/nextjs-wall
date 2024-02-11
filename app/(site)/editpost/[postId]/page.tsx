import EditPostForm from "@/app/ui/EditPostForm/EditPostForm";
import { getPostById } from "@/app/lib/actions";
export default async function EditPost({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPostById(params.postId);
  return (
    <main>
      <div className="px-2 sm:px-4 md:px-6">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        {post ? <EditPostForm post={post} /> : <p>Post not found</p>}
      </div>
    </main>
  );
}

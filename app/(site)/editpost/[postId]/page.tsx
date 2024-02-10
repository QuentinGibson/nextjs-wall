import EditPostForm from "@/app/ui/EditPostForm/EditPostForm";
export default function EditPost() {
  return (
    <main>
      <div className="px-2 sm:px-4 md:px-6">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        <EditPostForm />
      </div>
    </main>
  );
}

import { sans } from "@/app/fonts";
import NewPostForm from "@/app/ui/NewPostFom/NewPostForm";

export default async function NewPostPage() {
  return (
    <main>
      <div className="px-2 sm:px-4 md:px-6">
        <h1 className={`text-2xl font-bold ${sans.className}`}>New Post</h1>
        <NewPostForm />
      </div>
    </main>
  );
}

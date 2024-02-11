import { getUserByEmail } from "@/app/lib/actions";
import EditUserForm from "@/app/ui/EditUserForm/EditUserForm";
import { auth } from "@/auth";

export default async function EditProfilePage() {
  const session = await auth();
  const sessionUser = session?.user;
  const user = await getUserByEmail(sessionUser?.email || "");
  return (
    <main>
      <div className="px-2 sm:px-4 md:px-6">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        {user && <EditUserForm user={user} />}
      </div>
    </main>
  );
}

import SignInDB from "../../ui/SignIn/SignInDB";

export default async function LoginPage() {
  return (
    <main>
      <div className="px-2 sm:px-4 md:px-6">
        <div className="flex items-center justify-center my-10 md:w-screen">
          <SignInDB />
        </div>
      </div>
    </main>
  );
}

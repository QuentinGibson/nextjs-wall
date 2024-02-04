import {
  authenticateWithGoogle,
  authenticateWithDiscord,
  authtenticateWithTwitch,
} from "@/app/lib/actions";
import SignIn from "./SignIn";

export default async function SignInDB() {
  const actions = {
    google: authenticateWithGoogle,
    twitch: authtenticateWithTwitch,
    discord: authenticateWithDiscord,
  };

  return <SignIn actions={actions} />;
}

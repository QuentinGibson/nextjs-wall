import {
  EnvelopeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useFormStatus } from "react-dom";

interface SignInFormProps {
  state: {
    message: string | null;
    errors: {
      email: string[] | undefined;
      password: string[] | undefined;
    } | null;
  };
  dispatch: (payload: any) => void;
}

export default function SigninForm({ state, dispatch }: SignInFormProps) {
  return (
    <>
      <form
        className="flex w-full flex-col items-center justify-center gap-4"
        action={dispatch}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Email:</span>
          </div>
          <div className="inline-flex w-full items-center justify-start gap-2.5 self-stretch rounded-xl bg-base-200 p-3">
            <EnvelopeIcon width={24} height={24} />
            <input
              type="email"
              placeholder="Enter email"
              className="input w-full max-w-xs bg-base-200"
              name="email"
            />
            {state.errors?.email && (
              <div className="label">
                <span className="label-text-alt">{state.errors.email}</span>
              </div>
            )}
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password:</span>
          </div>
          <div className="inline-flex w-full items-center justify-start gap-2.5 self-stretch rounded-xl bg-base-200 p-3">
            <LockClosedIcon width={24} height={24} />
            <input
              type="password"
              placeholder="Enter password"
              className="input w-full max-w-xs bg-base-200"
              name="password"
            />
            {state.errors?.password && (
              <div className="label">
                <span className="label-text-alt">{state.errors.password}</span>
              </div>
            )}
          </div>
        </label>
        <SubmitButton />
      </form>
      {state.message && (
        <>
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{state.message}</p>
        </>
      )}
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="w-48 btn btn-secondary text-base-content"
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      Sign In
    </button>
  );
}

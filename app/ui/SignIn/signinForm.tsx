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
  dispatch: (payload: FormData) => Promise<void>;
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
          </div>
          {state.errors?.email && (
            <div className="label">
              <span className="label-text-alt text-error">
                {state.errors.email}
              </span>
            </div>
          )}
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
          </div>
          {state.errors?.password && (
            <div className="label">
              <span className="label-text-alt text-error">
                {state.errors.password}
              </span>
            </div>
          )}
        </label>
        <SubmitButton />
      </form>
      {state.message && (
        <div className="flex gap-1">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{state.message}</p>
        </div>
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

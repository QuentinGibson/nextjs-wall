"use client";
import {
  EnvelopeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function SigninForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);
  return (
    <>
      <form
        className="flex w-full flex-col items-center justify-center gap-4"
        action={dispatch}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Username:</span>
          </div>
          <div className="inline-flex w-full items-center justify-start gap-2.5 self-stretch rounded-xl bg-base-200 p-3">
            <EnvelopeIcon width={24} height={24} />
            <input
              type="text"
              placeholder="Enter username"
              className="input w-full max-w-xs bg-base-200"
              name="username"
            />
          </div>
          {/* {state.errors?.email && (
            <div className="label">
              <span className="label-text-alt text-error">
                {state.errors.email}
              </span>
            </div>
          )} */}
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
          {/* {state.errors?.password && (
            <div className="label">
              <span className="label-text-alt text-error">
                {state.errors.password}
              </span>
            </div>
          )} */}
        </label>
        <SubmitButton />
      </form>
      {state && (
        <div className="flex gap-1">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{state}</p>
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
      disabled={pending}
      aria-disabled={pending}
    >
      Sign In
    </button>
  );
}

//TODO: Fix tablet view

import Link from "next/link";
import {
  EnvelopeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { sans } from "@/app/fonts";
import React from "react";
import SocialButton from "../SocialButton";
import { CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";

interface SignUpPageProps {
  formState: {
    dispatch: (payload: FormData) => void;
    state: {
      message: string | null;
      errors: {
        email: string[] | undefined;
        password: string[] | undefined;
        verify: string[] | undefined;
      } | null;
    };
  };
  actions: {
    ["google"]: () => Promise<void>;
    ["discord"]: () => Promise<void>;
    ["twitch"]: () => Promise<void>;
  };
}

export default function SignUp({ formState, actions }: SignUpPageProps) {
  return (
    <div className="md:grid md:grid-cols-[1fr_2fr] md:gap-8">
      <section
        className={`inline-flex flex-col justify-center gap-7 ${sans.className}`}
      >
        <div className="flex justify-between items-center">
          <p>
            Already a member?{" "}
            <Link
              className="link-hover link font-bold link-primary"
              href={"/signin"}
            >
              Sign In
            </Link>
          </p>
        </div>
        <h1 className="text-5xl font-semibold leading-10">Sign Up</h1>
        <div className="flex flex-col items-start justify-start gap-8">
          <div className="flex flex-col items-start justify-start gap-5 self-stretch">
            <h2 className="self-stretch text-sm font-semibold leading-normal">
              Sign up with Open accounts
            </h2>
            <div className="grid grid-cols-2 items-center justify-center gap-2">
              <SocialButton
                altText="Googe G"
                image="logos/Google_G_Logo.svg"
                brand="Google"
                callback={actions.google}
              />
            </div>
          </div>
          <div className="relative h-0.5 w-full rounded-sm bg-base-200" />
          <div className="flex flex-col items-start justify-start gap-5 self-stretch">
            <span className="self-stretch text-sm font-semibold leading-none">
              Or continue with email address
            </span>
            <form
              className="flex w-full flex-col items-center justify-center gap-4"
              action={formState.dispatch}
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
                {formState.state.errors?.email?.map((error, index) => (
                  <div className="label" key={index}>
                    <span className="label-text-alt text-error">{error}</span>
                  </div>
                ))}
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
                {formState.state.errors?.password?.map((error, index) => (
                  <div className="label" key={index}>
                    <span className="label-text-alt text-error">{error}</span>
                  </div>
                ))}
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Verify Password:</span>
                </div>
                <div className="inline-flex w-full items-center justify-start gap-2.5 self-stretch rounded-xl bg-base-200 p-3">
                  <LockClosedIcon width={24} height={24} />
                  <input
                    type="password"
                    placeholder="Verify password"
                    className="input w-full max-w-xs bg-base-200"
                    name="verify"
                  />
                </div>
                {formState.state.errors?.verify?.map((error, index) => (
                  <div className="label" key={index}>
                    <span className="label-text-alt text-error">{error}</span>
                  </div>
                ))}
              </label>

              <button
                type="submit"
                className="btn btn-primary w-full font-bold"
              >
                Sign Up
              </button>
            </form>
            {formState.state.message && (
              <div className="flex gap-1">
                <ExclamationCircleIcon className="h-5 w-5 text-error" />
                <p className="text-sm text-error">{formState.state.message}</p>
              </div>
            )}
          </div>
        </div>
        <p className="self-stretch text-sm font-semibold leading-normal ">
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </p>
      </section>
    </div>
  );
}

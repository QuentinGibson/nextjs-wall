"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Press_Start, sans, silkscreen } from "@/app/fonts";
import { createContact } from "@/app/lib/actions";

export default function ContactForm({}) {
  const initalState = { message: "" };
  const [errorMessage, dispatch] = useFormState(createContact, initalState);
  return (
    <form
      action={dispatch}
      className="max-w-md p-6 mx-auto border bg-base-100 rounded-xl text-base-content border-secondary"
    >
      <p className={`text-xl ${silkscreen.className}`}>Say Hello</p>
      <div className="flex flex-col gap-4">
        <label className="w-full max-w-xs form-control">
          <div className="label">
            <span className={`label-text font-bold ${sans.className}`}>
              Name
            </span>
          </div>
          <input
            className={`w-full max-w-xs rounded-md input input-bordered ${sans.className}`}
            placeholder="John Doe"
            type="text"
          />
        </label>
        <label className="w-full max-w-xs form-control">
          <div className="label">
            <span className={`label-text font-bold ${sans.className}`}>
              Email
            </span>
          </div>
          <input
            className={`w-full max-w-xs rounded-md input input-bordered ${sans.className}`}
            placeholder="email@example.com"
            type="email"
          />
        </label>
        <label htmlFor="" className="w-full max-w-sm form-control">
          <div className="label">
            <span className={`label-text font-bold ${sans.className}`}>
              Message
            </span>
          </div>
          <textarea
            name="message"
            className={`w-full h-32 max-w-sm rounded-md textarea textarea-bordered ${sans.className}`}
            placeholder="Enter message"
          />
        </label>
        <SubmitButton />
      </div>
      {errorMessage && (
        <p className={`${sans.className}`}>{errorMessage.message}</p>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={`w-48 btn btn-secondary text-base-content font-bold ${sans.className}`}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      Send
    </button>
  );
}

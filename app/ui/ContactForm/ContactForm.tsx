import { useFormStatus } from "react-dom";
import { Press_Start } from "@/app/fonts";

interface ContactFormProps {
  errorMessage?: any;
  dispatch: (payload: FormData) => void;
}
export default async function ContactForm({
  errorMessage,
  dispatch,
}: ContactFormProps) {
  return (
    <form
      action={dispatch}
      className="max-w-md p-6 mx-auto border bg-base-100 rounded-xl text-base-content border-secondary"
    >
      <p className={`text-xl "${Press_Start.className}"`}>Say Hello</p>
      <div className="flex flex-col gap-4">
        <label className="w-full max-w-xs form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            className="w-full max-w-xs rounded-md input input-bordered"
            placeholder="John Doe"
            type="text"
          />
        </label>
        <label className="w-full max-w-xs form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            className="w-full max-w-xs rounded-md input input-bordered"
            placeholder="email@example.com"
            type="email"
          />
        </label>
        <label htmlFor="" className="w-full max-w-sm form-control">
          <div className="label">
            <span className="label-text">Message</span>
          </div>
          <textarea
            name="message"
            className="w-full h-32 max-w-sm rounded-md textarea textarea-bordered"
            placeholder="Enter message"
          />
        </label>
        <SubmitButton />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
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
      Send
    </button>
  );
}

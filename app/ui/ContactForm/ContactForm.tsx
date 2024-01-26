import { silkscreen } from "../../fonts";

interface ContactFormProps {
  errorMessage?: any;
  dispatch: () => Promise<string | void>;
  pending?: boolean;
}
export default async function ContactForm({
  errorMessage,
  dispatch,
  pending = false,
}: ContactFormProps) {
  return (
    <form
      action={dispatch}
      className="bg-base-100 max-w-md mx-auto p-6 rounded-xl text-base-content border border-secondary"
    >
      <p className={`text-xl ${silkscreen.className}`}>Say Hello</p>
      <div className="flex flex-col gap-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            className="input input-bordered w-full max-w-xs rounded-md"
            placeholder="John Doe"
            type="text"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            className="input input-bordered w-full max-w-xs rounded-md"
            placeholder="email@example.com"
            type="email"
          />
        </label>
        <label htmlFor="" className="form-control w-full max-w-sm">
          <div className="label">
            <span className="label-text">Message</span>
          </div>
          <textarea
            name="message"
            className="textarea textarea-bordered h-32 w-full max-w-sm rounded-md"
            placeholder="Enter message"
          />
        </label>
        <button
          className="btn btn-secondary text-base-content w-48"
          type="submit"
          disabled={pending}
          aria-disabled={pending}
        >
          Send
        </button>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

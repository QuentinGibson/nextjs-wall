"use client";
import { sans } from "@/app/fonts";
import { updatePost } from "@/app/lib/actions";
import { Prisma } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";

export default function EditPostForm({
  post,
}: {
  post: Prisma.PostGetPayload<{}>;
}) {
  const initialState = { message: undefined, errors: undefined };
  const [state, dispatch] = useFormState(updatePost, initialState);
  return (
    <form action={dispatch}>
      <div className={`grid gap-4 ${sans.className}`}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Title</span>
          </div>
          <input
            type="text"
            placeholder="Enter your title here"
            className="input input-bordered w-full max-w-xs"
            name="title"
            defaultValue={post.title}
          />
        </label>
        {state.errors?.title && (
          <div className="label">
            <span className="label-text-alt text-error">
              {state.errors.title}
            </span>
          </div>
        )}
        <label className="form-control">
          <div className="label">
            <span className="label-text font-bold">Content</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24 max-w-96"
            placeholder="Enter your message here"
            defaultValue={post.content}
            name="content"
          ></textarea>
        </label>
        {state.errors?.content && (
          <div className="label">
            <span className="label-text-alt text-error">
              {state.errors.content}
            </span>
          </div>
        )}
        <input type="hidden" name="postId" value={post.id} />
        <div className="w-[120px]">
          <SubmitButton />
        </div>
        {state.message && (
          <div className="label">
            {state.errors ? (
              <span className="label-text-alt text-error">{state.message}</span>
            ) : (
              <span className="label-text-alt text-success">
                {state.message}
              </span>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`btn btn-primary w-full`}
      disabled={pending}
      aria-disabled={pending}
    >
      {pending && <span className="loading loading-spinner" />}
      Submit
    </button>
  );
}

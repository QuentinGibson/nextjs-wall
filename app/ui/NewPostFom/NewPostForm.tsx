"use client";
import { createPost } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function NewPostForm() {
  const initialState = { message: undefined, errors: undefined };
  const [state, dispatch] = useFormState(createPost, initialState);
  return (
    <form action={dispatch}>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Title</span>
        </div>
        <input
          type="text"
          placeholder="Enter your title here"
          className="input input-bordered w-full max-w-xs"
          name="title"
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
          <span className="label-text">Content</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Enter your message here"
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
      <input className="btn btn-primary" type="submit" value="Submit" />
      {state.message && (
        <div className="label">
          {state.errors ? (
            <span className="label-text-alt text-error">{state.message}</span>
          ) : (
            <span className="label-text-alt text-success">{state.message}</span>
          )}
        </div>
      )}
    </form>
  );
}

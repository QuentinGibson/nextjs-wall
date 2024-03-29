"use client";
import { updateUser } from "@/app/lib/actions";
import { Prisma } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import FileUploader from "../FileUploader/FileUploader";
import { useState } from "react";

export default function EditUserForm({
  user,
}: {
  user: Prisma.UserGetPayload<{}>;
}) {
  const initialImageUrl = user.image || "/placeholder-image.jpg";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const initialState = { message: undefined, errors: undefined };
  const [state, dispatch] = useFormState(updateUser, initialState);
  return (
    <form
      action={(formData) => {
        formData.set("image", imageUrl);
        dispatch(formData);
      }}
      encType="multipart/form-data"
    >
      <div className="flex flex-col gap-8">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            name="username"
            defaultValue={user.username || ""}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input type="email" name="email" defaultValue={user.email} />
        </label>
        <FileUploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={pending}
        aria-disabled={pending}
      >
        {pending && <span className="loading loading-spinner"></span>}
        Save
      </button>
    </div>
  );
}

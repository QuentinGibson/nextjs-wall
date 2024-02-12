"use client";
import { updateUser } from "@/app/lib/actions";
import { Prisma } from "@prisma/client";
import { useFormState } from "react-dom";
import FileUploader from "../FileUploader/FileUploader";

export default function EditUserForm({
  user,
}: {
  user: Prisma.UserGetPayload<{}>;
}) {
  const initialState = { message: undefined, errors: undefined };
  const [state, dispatch] = useFormState(updateUser, initialState);
  return (
    <form action={dispatch} encType="multipart/form-data">
      <div>
        <label>Username</label>
        <input type="text" name="username" defaultValue={user.username || ""} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" defaultValue={user.email} />
      </div>
      <FileUploader />
      <div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

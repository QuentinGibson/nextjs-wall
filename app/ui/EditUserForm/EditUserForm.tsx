"use client";
import { updateUser } from "@/app/lib/actions";
import { Prisma } from "@prisma/client";
import { useFormState } from "react-dom";

export default function EditUserForm({
  user,
}: {
  user: Prisma.UserGetPayload<{}>;
}) {
  const initialState = { message: undefined, errors: undefined };
  const [state, dispatch] = useFormState(updateUser, initialState);
  return (
    <form action={dispatch}>
      <div>
        <label>Username</label>
        <input type="text" name="username" defaultValue={user.username || ""} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" defaultValue={user.email} />
      </div>
      <div>
        <label>Image</label>
        <input type="file" name="image" defaultValue={user.image || ""} />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

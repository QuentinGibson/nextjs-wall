"use client";

import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { toggleLike } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function LikeButton({
  liked,
  postId,
}: {
  liked: boolean;
  postId: string;
}) {
  const initialState = liked;
  const [state, dispatch] = useFormState(toggleLike, initialState);

  return (
    <form action={dispatch}>
      <input type="hidden" name="like" checked={state} />
      <input type="hidden" name="postId" value={postId} />
      <button className="like-button">
        {state ? (
          <HeartIconSolid className="h-5 w-5" />
        ) : (
          <HeartIconOutline className="h-5 w-5" />
        )}
      </button>
    </form>
  );
}

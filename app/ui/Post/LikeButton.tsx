"use client";

import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { toggleLike } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useOptimistic } from "react";

export default function LikeButton({
  liked,
  postId,
}: {
  liked: boolean;
  postId: string;
}) {
  const initialState = liked;
  const [state, dispatch] = useFormState<boolean, FormData>(
    toggleLike,
    initialState
  );
  const [optimisticState, addOptimistic] = useOptimistic<boolean>(state);
  return (
    <form
      action={async (formData: FormData) => {
        const like = !!formData.get("like");
        formData.set("postId", postId);
        addOptimistic((like) => !like);
        dispatch(formData);
      }}
    >
      <input type="hidden" name="like" checked={optimisticState} />
      <button className="like-button">
        {optimisticState ? (
          <HeartIconSolid className="h-5 w-5" />
        ) : (
          <HeartIconOutline className="h-5 w-5" />
        )}
      </button>
    </form>
  );
}

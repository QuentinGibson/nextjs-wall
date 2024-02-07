"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function FlashToasterClient(props: {
  flash: string | undefined;
}) {
  useEffect(() => {
    if (!!props.flash) {
      const { type, message } = JSON.parse(props.flash);
      if (type === "success") {
        toast.success(message);
      } else if (type === "error") {
        toast.error(message);
      }
    }
  }, [props.flash]);
  return null;
}

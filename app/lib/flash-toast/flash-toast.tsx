import FlashToasterClient from "@/app/lib/flash-toast/flash-toast-client";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

export function FlashToaster() {
  const flash = cookies().get("flash");
  return (
    <>
      <Toaster closeButton richColors />
      <FlashToasterClient flash={flash?.value} />
    </>
  );
}

export function setFlash(flash: {
  type: "success" | "error";
  message: string;
}) {
  cookies().set("flash", JSON.stringify(flash), {
    path: "/",
    expires: new Date(Date.now() + 10 * 1000),
  });
}

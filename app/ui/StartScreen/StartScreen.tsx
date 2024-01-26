import { silkscreen } from "../../fonts";
import Link from "next/link";
export default async function StartScreen() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <h1 className={`${silkscreen.className} text-4xl`}>Press Start</h1>
      <Link
        className={`btn btn-error text-white rounded-3xl px-16 py-2 ${silkscreen.className}`}
        href={"/"}
      >
        Start
      </Link>
    </div>
  );
}

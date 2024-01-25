import { silkscreen } from "../../fonts";
import Link from "next/link";
export default async function StartScreen() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
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

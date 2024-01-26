import Image from "next/image";
import { clsx } from "clsx";
import { sans, silkscreen } from "../../fonts";

interface SongProps {
  name: string;
  artist: string;
  cover: string;
  content: string;
  flipped?: boolean;
}
export default async function Song({
  name,
  artist,
  cover,
  content,
  flipped = false,
}: SongProps) {
  return (
    <div
      className={`flex flex-col items-center px-2 py-2 md:flex-row gap-4 max-w-3xl mx-auto`}
    >
      <div className={`relative w-full aspect-square`}>
        <Image
          fill
          src={cover}
          alt={`Album cover for ${artist}`}
          className={clsx([{ "order-2": flipped }])}
        />
      </div>
      <div
        style={{ flexBasis: "fit-content" }}
        className="flex flex-col grow items-stretch gap-4"
      >
        <p className={`${silkscreen.className}`}>{name}</p>
        <p className={`${silkscreen.className} text-sm`}>{artist}</p>
        <p className={`${sans.className}`}>{content}</p>
      </div>
    </div>
  );
}

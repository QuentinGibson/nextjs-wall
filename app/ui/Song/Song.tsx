import Image from "next/image";
import { clsx } from "clsx";
import { sans, silkscreen } from "../../fonts";

interface SongProps {
  name: string;
  artist: string;
  album: string;
  cover: string;
  content: string;
  flipped?: boolean;
}
export default async function Song({
  name,
  artist,
  album,
  cover,
  content,
  flipped = false,
}: SongProps) {
  return (
    <div
      className={`flex flex-col items-center px-2 py-2 md:flex-row gap-4 max-w-3xl mx-auto`}
    >
      <div
        className={clsx([
          { "md:order-2": flipped },
          `relative w-full aspect-square `,
        ])}
      >
        <Image fill src={cover} alt={`Album cover for ${artist}`} />
      </div>
      <div
        style={{ flexBasis: "fit-content" }}
        className="flex flex-col grow items-stretch gap-4"
      >
        <p className={`${silkscreen.className} text-lg md:text-3xl`}>{name}</p>
        <p className={`${silkscreen.className} text-sm`}>{artist}</p>
        <p className={`${silkscreen.className} text-sm`}>{album}</p>
        <p className={`${sans.className}`}>{content}</p>
      </div>
    </div>
  );
}

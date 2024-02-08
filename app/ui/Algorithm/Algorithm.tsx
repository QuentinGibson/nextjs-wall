import { silkscreen } from "../../fonts";
import Image from "next/image";
interface AlgorithmProps {
  name: string;
  icon: string;
  progress: 0 | 1 | 2;
}

export default async function Algorithm({
  name,
  icon,
  progress,
}: AlgorithmProps) {
  const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500"];
  return (
    <div className="flex flex-col gap-3 w-[50px] items-center">
      <div
        className={`${colors[progress]} flex justify-center items-center gap-3 rounded-full w-[50px] h-[50px]`}
      >
        <Image
          width={24}
          height={24}
          src={icon}
          alt={`A representation of ${name}`}
        />
      </div>
      <p className={`text-base-content ${silkscreen.className} text-center`}>
        {name}
      </p>
    </div>
  );
}

import { silkscreen } from "../../fonts";
import Image from "next/image";
interface AlgorithmProps {
  name: string;
  icon: string;
}

export default async function Algorithm({ name, icon }: AlgorithmProps) {
  return (
    <div className="flex flex-col gap-3 w-[50px] items-center">
      <div className="flex justify-center items-center gap-3 rounded-full bg-error w-[50px] h-[50px]">
        <Image
          width={24}
          height={24}
          src={icon}
          alt={`A representation of ${name}`}
        />
      </div>
      <p className={`text-base-content ${silkscreen.className}`}>{name}</p>
    </div>
  );
}

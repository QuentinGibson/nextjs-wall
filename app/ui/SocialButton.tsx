import Image from "next/image";

interface SocialButtonProps {
  image: string;
  altText: string;
  callback: () => Promise<string | undefined>;
  brand: string;
}

export default function SocialButton({
  image,
  callback,
  altText,
  brand,
}: SocialButtonProps) {
  return (
    <button className="btn btn-outline flex items-center justify-between">
      <Image alt={altText} src={image} width={24} height={24} />
      <p className="text-xs font-bold leading-normal md:text-base">{brand}</p>
    </button>
  );
}

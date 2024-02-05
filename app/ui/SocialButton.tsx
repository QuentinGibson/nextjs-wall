"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface SocialButtonProps {
  image: string;
  altText: string;
  provider: string;
  brand: string;
}

export default function SocialButton({
  image,
  altText,
  brand,
  provider,
}: SocialButtonProps) {
  return (
    <button
      onClick={() => {
        signIn(provider);
      }}
      className="btn btn-outline flex items-center justify-between"
    >
      <Image alt={altText} src={image} width={24} height={24} />
      <p className="text-xs font-bold leading-normal md:text-base">{brand}</p>
    </button>
  );
}

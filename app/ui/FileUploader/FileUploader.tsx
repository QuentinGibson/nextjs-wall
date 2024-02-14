"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function FileUploader({
  imageUrl,
  setImageUrl,
}: {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}) {
  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data: { fileUrl: string } = await res.json();
      console.log(data.fileUrl);

      setImageUrl(data.fileUrl);
    } catch (error) {
      console.error("something went wrong, check your console.");
    }

    /** Reset file input */
    // e.target.type = "text";
    // e.target.type = "file";
  };

  return (
    <label className="form-control block">
      <div className="label">
        <span className="label-text">Pick an avatar</span>
      </div>
      <div className="aspect-square h-40 relative overflow-hidden">
        <Image src={imageUrl} alt="uploaded image" fill priority={true} />
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        onChange={onImageFileChange}
      />
    </label>
  );
}

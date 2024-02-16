"use client";

import { newVerification } from "@/app/lib/actions";
import { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const [data, setData] = useState<{
    success: string | undefined;
    error: string | undefined;
  }>({ success: undefined, error: undefined });

  const token = searchParams.token;

  const onSubmit = useCallback(async () => {
    // If there's already a success or error message, don't do anything
    if (data.success || data.error) return;

    if (!token) {
      setData({ success: undefined, error: "Invalid token!" });
      return;
    }

    try {
      let newData = await newVerification(token);
      setData((currentData) => {
        // If there's already a success or error message, don't overwrite it
        if (currentData.success || currentData.error) return currentData;
        return newData;
      });
    } catch (e) {
      console.error(e);
      setData({ success: undefined, error: "An error occurred!" });
    }
  }, [token, data]);

  useEffect(() => {
    onSubmit();
  }, []);
  return (
    <div>
      {!data.success && !data.error && <p>Verifying...</p>}
      {data.success && <p>{data.success}</p>}
      {!data.success && data.error && <p>{data.error}</p>}
    </div>
  );
}

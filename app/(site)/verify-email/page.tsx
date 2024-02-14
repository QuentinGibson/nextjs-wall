"use client";

import { newVerification } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div>
      {success.length === 0 && error.length === 0 && <p>Verifying...</p>}
      {success.length && <p>{success}</p>}
      {success.length === 0 && error.length !== 0 && <p>{error}</p>}
    </div>
  );
}

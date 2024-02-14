"use client";

import { newVerification } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function VerifyEmailPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

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
      {!success && !error && <p>Verifying...</p>}
      {success && <p>{success}</p>}
      {!success && <p>{error}</p>}
    </div>
  );
}

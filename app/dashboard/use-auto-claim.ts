"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAddDomainMutation } from "@/queries/domains";

export interface AutoClaimState {
  claimError: string | null;
  failedName: string | null;
}

export function useAutoClaim(domainsLoaded: boolean): AutoClaimState {
  const searchParams = useSearchParams();
  const router = useRouter();
  const addMutation = useAddDomainMutation();
  const claimedRef = useRef(false);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [failedName, setFailedName] = useState<string | null>(null);

  const claimName = searchParams.get("claim");

  useEffect(() => {
    if (!claimName || !domainsLoaded || claimedRef.current) return;
    claimedRef.current = true;

    addMutation
      .mutateAsync(claimName)
      .then(() => {
        router.replace("/dashboard");
      })
      .catch((err: Error) => {
        setClaimError(err.message);
        setFailedName(claimName);
        router.replace("/dashboard");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimName, domainsLoaded]);

  return { claimError, failedName };
}

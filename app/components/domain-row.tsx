"use client";

import { useDeleteDomainMutation, type Domain } from "@/queries/domains";

export function DomainRow({ domain }: { domain: Domain }) {
  const deleteMutation = useDeleteDomainMutation();
  const domainSuffix = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";
  const isTemp = domain.id.startsWith("temp-");

  return (
    <div
      className={`flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 ${isTemp ? "opacity-60" : ""}`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {domain.name}.{domainSuffix}
        </p>
        <p className="text-xs text-muted">
          {domain.ipv4 || domain.ipv6
            ? [domain.ipv4, domain.ipv6].filter(Boolean).join(" / ")
            : "No IP set"}
        </p>
      </div>
      <button
        onClick={() => deleteMutation.mutate(domain.id)}
        disabled={deleteMutation.isPending || isTemp}
        className="ml-4 rounded px-3 py-1 text-sm text-danger transition-colors hover:bg-danger/10 disabled:opacity-50"
      >
        {deleteMutation.isPending ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

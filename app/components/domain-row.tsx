"use client";

import { Icon } from "@iconify/react";
import { useDeleteDomainMutation, type Domain } from "@/queries/domains";
import { timeAgo } from "@/lib/format-time";

export function DomainRow({ domain }: { domain: Domain }) {
  const deleteMutation = useDeleteDomainMutation();
  const domainSuffix = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";
  const isTemp = domain.id.startsWith("temp-");

  return (
    <div
      className={`bento-card relative rounded-lg pl-4 pr-2 py-3 ${isTemp ? "opacity-60" : ""}`}
    >
      <button
        onClick={() => deleteMutation.mutate(domain.id)}
        disabled={deleteMutation.isPending || isTemp}
        title="Delete"
        className="absolute top-3 right-3 text-white hover:text-neutral-400 transition-colors disabled:opacity-40"
      >
        <Icon icon="solar:trash-bin-minimalistic-linear" width={14} />
      </button>
      <p className="text-sm font-medium text-white flex items-center gap-2">
        {domain.ipv4 || domain.ipv6 ? (
          <Icon icon="solar:check-circle-linear" width={14} className="text-emerald-500/80 shrink-0" />
        ) : (
          <Icon icon="solar:clock-circle-linear" width={14} className="text-amber-500/70 shrink-0" />
        )}
        {domain.name}.{domainSuffix}
      </p>
      <div className="mt-1.5 flex items-baseline justify-between gap-3">
        <p className="text-sm text-neutral-500">
          {domain.ipv4 || domain.ipv6 ? (
            <>
              {domain.ipv4 && (
                <>
                  <span className="text-neutral-600 text-xs">A</span>{" "}
                  {domain.ipv4}
                </>
              )}
              {domain.ipv4 && domain.ipv6 && (
                <span className="text-neutral-600"> / </span>
              )}
              {domain.ipv6 && (
                <>
                  <span className="text-neutral-600 text-xs">AAAA</span>{" "}
                  {domain.ipv6}
                </>
              )}
            </>
          ) : (
            "No IP set"
          )}
        </p>
        <p className="shrink-0 text-xs text-neutral-600">
          created {timeAgo(domain.createdAt)}
          {domain.updatedAt !== domain.createdAt &&
            ` · updated ${timeAgo(domain.updatedAt)}`}
        </p>
      </div>
    </div>
  );
}

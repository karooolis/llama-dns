"use client";

import { Icon } from "@iconify/react";
import { useDeleteDomainMutation, type Domain } from "@/queries/domains";
import { timeAgo } from "@/lib/format-time";

export function DomainRow({ domain }: { domain: Domain }) {
  const deleteMutation = useDeleteDomainMutation();
  const domainSuffix = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";
  const isTemp = domain.id.startsWith("temp-");

  return (
    <div className={`bento-card relative rounded-lg py-3 pr-2 pl-4 ${isTemp ? "opacity-60" : ""}`}>
      <button
        onClick={() => deleteMutation.mutate(domain.id)}
        disabled={deleteMutation.isPending || isTemp}
        title="Delete"
        className="absolute top-3 right-3 text-white transition-colors hover:text-neutral-400 disabled:opacity-40"
      >
        <Icon icon="solar:trash-bin-minimalistic-linear" width={14} />
      </button>
      <p className="flex items-center gap-2 text-sm font-medium text-white">
        {domain.ipv4 || domain.ipv6 ? (
          <Icon
            icon="solar:check-circle-linear"
            width={14}
            className="shrink-0 text-emerald-500/80"
          />
        ) : (
          <Icon
            icon="solar:clock-circle-linear"
            width={14}
            className="shrink-0 text-amber-500/70"
          />
        )}
        {domain.name}.{domainSuffix}
      </p>
      <div className="mt-1.5 flex items-baseline justify-between gap-3">
        <p className="text-sm text-neutral-500">
          {domain.ipv4 || domain.ipv6 ? (
            <>
              {domain.ipv4 && (
                <>
                  <span className="text-xs text-neutral-600">A</span> {domain.ipv4}
                </>
              )}
              {domain.ipv4 && domain.ipv6 && <span className="text-neutral-600"> / </span>}
              {domain.ipv6 && (
                <>
                  <span className="text-xs text-neutral-600">AAAA</span> {domain.ipv6}
                </>
              )}
            </>
          ) : (
            "No IP set"
          )}
        </p>
        <p className="shrink-0 text-xs text-neutral-600">
          created {timeAgo(domain.createdAt)}
          {domain.updatedAt !== domain.createdAt && ` · updated ${timeAgo(domain.updatedAt)}`}
        </p>
      </div>
    </div>
  );
}

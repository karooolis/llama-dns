"use client";

import { Icon } from "@iconify/react";
import { useDeleteDomainMutation, type Domain } from "@/queries/domains";
import { Button } from "../design-system/components";
import { timeAgo } from "@/lib/format-time";

export function DomainRow({ domain }: { domain: Domain }) {
  const deleteMutation = useDeleteDomainMutation();
  const domainSuffix = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";
  const isTemp = domain.id.startsWith("temp-");

  return (
    <div
      className={`bento-card relative rounded-lg pl-4 pr-2 py-3 ${isTemp ? "opacity-60" : ""}`}
    >
      <Button
        variant="danger"
        size="sm"
        onClick={() => deleteMutation.mutate(domain.id)}
        disabled={deleteMutation.isPending || isTemp}
        className="absolute top-2 right-2"
      >
        <Icon icon="solar:trash-bin-minimalistic-linear" width={14} />
      </Button>
      <p className="text-sm font-medium text-white">
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
          {timeAgo(domain.createdAt)}
          {domain.updatedAt !== domain.createdAt &&
            ` · updated ${timeAgo(domain.updatedAt)}`}
        </p>
      </div>
    </div>
  );
}

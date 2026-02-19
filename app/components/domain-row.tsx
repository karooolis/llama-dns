"use client";

import { Icon } from "@iconify/react";
import { useDeleteDomainMutation, type Domain } from "@/queries/domains";
import { Button } from "../design-system/components";

export function DomainRow({ domain }: { domain: Domain }) {
  const deleteMutation = useDeleteDomainMutation();
  const domainSuffix = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";
  const isTemp = domain.id.startsWith("temp-");

  return (
    <div
      className={`bento-card flex items-center justify-between rounded-lg px-4 py-3 ${isTemp ? "opacity-60" : ""}`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">
          {domain.name}.{domainSuffix}
        </p>
        <p className="text-xs text-neutral-500">
          {domain.ipv4 || domain.ipv6
            ? [domain.ipv4, domain.ipv6].filter(Boolean).join(" / ")
            : "No IP set"}
        </p>
      </div>
      <Button
        variant="danger"
        size="sm"
        onClick={() => deleteMutation.mutate(domain.id)}
        disabled={deleteMutation.isPending || isTemp}
        className="ml-4 flex items-center gap-1.5"
      >
        <Icon icon="solar:trash-bin-minimalistic-linear" width={14} />
        {deleteMutation.isPending ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}

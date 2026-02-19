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
      <p className="mt-1.5 text-sm text-neutral-500">
        {domain.ipv4 || domain.ipv6
          ? [domain.ipv4, domain.ipv6].filter(Boolean).join(" / ")
          : "No IP set"}
      </p>
    </div>
  );
}

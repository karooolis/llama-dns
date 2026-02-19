"use client";

import { useDomainsQuery } from "@/queries/domains";
import { AddDomainForm } from "../components/add-domain-form";
import { DomainRow } from "../components/domain-row";
import { TokenDisplay } from "../components/token-display";
import { BentoCard } from "../design-system/components";
import { MAX_DOMAINS } from "@/lib/constants";

export function DashboardContent() {
  const { data: domains = [] } = useDomainsQuery();

  return (
    <div className="space-y-6">
      <BentoCard size="compact" hover={false}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Domains
          </h2>
          <span className="text-sm text-neutral-500">
            {domains.length}/{MAX_DOMAINS}
          </span>
        </div>

        {domains.length > 0 ? (
          <div className="space-y-4">
            {domains.map((domain) => (
              <DomainRow key={domain.id} domain={domain} />
            ))}
          </div>
        ) : (
          <p className="my-4 text-sm text-neutral-500 font-light">
            No domains yet. Add your first subdomain below.
          </p>
        )}

        {domains.length < MAX_DOMAINS && <AddDomainForm />}
      </BentoCard>

      <BentoCard size="compact" hover={false}>
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-white">
          API Token
        </h2>
        <TokenDisplay />
      </BentoCard>
    </div>
  );
}

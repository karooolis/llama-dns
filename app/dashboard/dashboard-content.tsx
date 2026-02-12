"use client";

import { useDomainsQuery } from "@/queries/domains";
import { AddDomainForm } from "../components/add-domain-form";
import { DomainRow } from "../components/domain-row";
import { TokenDisplay } from "../components/token-display";
import { MAX_DOMAINS } from "@/lib/constants";

export function DashboardContent() {
  const { data: domains = [] } = useDomainsQuery();

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Domains</h2>
          <span className="text-sm text-muted">
            {domains.length}/{MAX_DOMAINS}
          </span>
        </div>

        {domains.length > 0 ? (
          <div className="mb-4 space-y-2">
            {domains.map((domain) => (
              <DomainRow key={domain.id} domain={domain} />
            ))}
          </div>
        ) : (
          <p className="mb-4 text-sm text-muted">
            No domains yet. Add your first subdomain below.
          </p>
        )}

        {domains.length < MAX_DOMAINS && <AddDomainForm />}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">API Token</h2>
        <TokenDisplay />
      </section>
    </div>
  );
}

"use client";

import { useDomainsQuery } from "@/queries/domains";
import { useTokenQuery } from "@/queries/token";
import { AddDomainForm, DomainRow, TokenDisplay } from "../components";
import { BentoCard } from "../components/bento-card";
import { MAX_DOMAINS } from "@/lib/constants";
import { useAutoClaim } from "./use-auto-claim";

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-white/5 ${className}`} />;
}

function DomainsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-lg border border-white/5 bg-white/2 p-4">
          <Skeleton className="mb-2 h-4 w-40" />
          <Skeleton className="h-3.5 w-56" />
        </div>
      ))}
    </div>
  );
}

function TokenSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center rounded-lg border border-white/6 bg-white/2 px-3 py-2.5">
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="rounded-lg border border-white/6 bg-white/2 p-4">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export function DashboardContent() {
  const { data: domains = [], isLoading: domainsLoading } = useDomainsQuery();
  const { isLoading: tokenLoading } = useTokenQuery();
  const { claimError, failedName } = useAutoClaim(!domainsLoading);

  return (
    <div className="space-y-6">
      <BentoCard size="compact" hover={false}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-white">Domains</h2>
          {!domainsLoading && (
            <span className="text-sm text-neutral-500">
              {domains.length}/{MAX_DOMAINS}
            </span>
          )}
        </div>

        {claimError && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {claimError}
          </div>
        )}

        {domainsLoading ? (
          <DomainsSkeleton />
        ) : domains.length > 0 ? (
          <div className="space-y-4">
            {domains.map((domain) => (
              <DomainRow key={domain.id} domain={domain} />
            ))}
          </div>
        ) : (
          <p className="my-4 text-sm font-light text-neutral-500">
            No domains yet. Add your first subdomain below.
          </p>
        )}

        {!domainsLoading && domains.length < MAX_DOMAINS && (
          <AddDomainForm initialName={failedName ?? undefined} />
        )}
      </BentoCard>

      <BentoCard size="compact" hover={false}>
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-white">API Token</h2>
        {tokenLoading ? <TokenSkeleton /> : <TokenDisplay />}
      </BentoCard>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTokenQuery, useRegenerateTokenMutation } from "@/queries/token";
import { useDomainsQuery } from "@/queries/domains";

export function TokenDisplay() {
  const { data: tokenData } = useTokenQuery();
  const regenerate = useRegenerateTokenMutation();
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const { data: domains = [] } = useDomainsQuery();

  const token = tokenData?.token ?? "";
  const masked = token ? token.slice(0, 8) + "..." + token.slice(-4) : "";

  async function copyToken() {
    if (!token) return;
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleRegenerate() {
    if (!confirm("Regenerate your API token? The old token will stop working."))
      return;
    await regenerate.mutateAsync();
    setRevealed(true);
  }

  const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";
  const firstDomain = domains[0]?.name ?? "SUBDOMAIN";
  const updateUrl = `https://${domain}/update?domains=${firstDomain}&token=${token}&verbose=true`;

  async function copyUrl() {
    if (!token) return;
    await navigator.clipboard.writeText(updateUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <code className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm font-mono">
          {revealed ? token : masked}
        </code>
        <button
          onClick={() => setRevealed(!revealed)}
          className="rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-card"
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
        <button
          onClick={copyToken}
          className="rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-card"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleRegenerate}
          disabled={regenerate.isPending}
          className="rounded-lg border border-border px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/10 disabled:opacity-50"
        >
          {regenerate.isPending ? "..." : "Regenerate"}
        </button>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-muted">Update your IP:</p>
          <button
            onClick={copyUrl}
            disabled={!token}
            className="text-xs text-accent transition-colors hover:text-accent-hover disabled:opacity-50"
          >
            {copiedUrl ? "Copied!" : "Copy URL"}
          </button>
        </div>
        <code className="block break-all text-xs text-muted">
          {updateUrl}
        </code>
      </div>
    </div>
  );
}

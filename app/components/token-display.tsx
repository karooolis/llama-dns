"use client";

import { useState } from "react";
import { useTokenQuery, useRegenerateTokenMutation } from "@/queries/token";
import { useDomainsQuery } from "@/queries/domains";
import { Button } from "../design-system/components";

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
        <code className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm font-mono">
          {revealed ? token : masked}
        </code>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setRevealed(!revealed)}
        >
          {revealed ? "Hide" : "Reveal"}
        </Button>
        <Button variant="secondary" size="sm" onClick={copyToken}>
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleRegenerate}
          disabled={regenerate.isPending}
        >
          {regenerate.isPending ? "..." : "Regenerate"}
        </Button>
      </div>
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-neutral-500">Update your IP:</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyUrl}
            disabled={!token}
          >
            {copiedUrl ? "Copied!" : "Copy URL"}
          </Button>
        </div>
        <code className="block break-all text-xs text-neutral-500 font-light">
          {updateUrl}
        </code>
      </div>
    </div>
  );
}

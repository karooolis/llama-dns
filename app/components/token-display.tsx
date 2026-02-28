"use client";

import { useState } from "react";
import { useTokenQuery, useRegenerateTokenMutation } from "@/queries/token";
import { useDomainsQuery } from "@/queries/domains";
import { Icon } from "@iconify/react";
import { Button } from "./button";
import { Terminal } from "./terminal";
import { timeAgo } from "@/lib/format-time";

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
    if (!confirm("Regenerate your API token? The old token will stop working.")) return;
    await regenerate.mutateAsync();
    setRevealed(true);
  }

  const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";
  const apiDomain = `www.${domain}`;
  const firstDomain = domains[0]?.name ?? "SUBDOMAIN";
  const updateUrl = `https://${apiDomain}/update?domains=${firstDomain}&token=${token}&verbose=true`;

  async function copyUrl() {
    if (!token) return;
    await navigator.clipboard.writeText(updateUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* Token row */}
      <div className="flex items-center rounded-lg border border-white/6 bg-white/2">
        <code className="flex-1 px-3 py-2.5 font-mono text-sm">{revealed ? token : masked}</code>
        {tokenData?.createdAt && (
          <span className="pr-1 text-xs text-neutral-600">{timeAgo(tokenData.createdAt)}</span>
        )}
        <div className="flex items-center pr-1">
          <Button variant="ghost" size="sm" onClick={() => setRevealed(!revealed)}>
            <Icon icon={revealed ? "solar:eye-closed-linear" : "solar:eye-linear"} width={14} />
          </Button>
          <Button variant="ghost" size="sm" onClick={copyToken}>
            <Icon icon={copied ? "solar:check-circle-linear" : "solar:copy-linear"} width={14} />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleRegenerate}
            disabled={regenerate.isPending}
          >
            <Icon icon="solar:refresh-linear" width={14} />
          </Button>
        </div>
      </div>

      {/* Terminal-style update URL */}
      <Terminal
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={copyUrl}
            disabled={!token}
            className="flex items-center gap-1.5"
          >
            <Icon icon={copiedUrl ? "solar:check-circle-linear" : "solar:copy-linear"} width={14} />
          </Button>
        }
      >
        <div className="flex items-start gap-2">
          <span className="text-emerald-500/70 select-none">$</span>
          <code className="break-all text-neutral-300">
            curl{" "}
            <span className="text-amber-200/80">
              &quot;https://{apiDomain}/update?domains={firstDomain}&amp;token=
              {revealed ? token : masked}&amp;verbose=true&quot;
            </span>
          </code>
        </div>
      </Terminal>
    </div>
  );
}

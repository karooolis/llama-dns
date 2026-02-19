"use client";

import { useState } from "react";
import { useTokenQuery, useRegenerateTokenMutation } from "@/queries/token";
import { useDomainsQuery } from "@/queries/domains";
import { Icon } from "@iconify/react";
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
    <div className="space-y-4">
      {/* Token row */}
      <div className="flex items-center rounded-lg border border-white/[0.06] bg-white/[0.02]">
        <code className="flex-1 px-3 py-2.5 text-sm font-mono">
          {revealed ? token : masked}
        </code>
        <div className="flex items-center pr-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setRevealed(!revealed)}
          >
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
      <div className="rounded-xl border border-white/[0.08] bg-[#050505] shadow-2xl overflow-hidden">
        {/* Terminal chrome */}
        <div className="flex items-center justify-between pl-4 pr-2 py-2 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={copyUrl}
            disabled={!token}
            className="flex items-center gap-1.5"
          >
            <Icon icon={copiedUrl ? "solar:check-circle-linear" : "solar:copy-linear"} width={14} />
          </Button>
        </div>

        {/* Terminal body */}
        <div className="p-4 font-mono text-[12px] leading-6">
          <div className="flex items-start gap-2">
            <span className="text-emerald-500/70 select-none">$</span>
            <code className="text-neutral-300 break-all">
              curl{" "}
              <span className="text-amber-200/80">
                &quot;https://{domain}/update?domains={firstDomain}&amp;token=
                {revealed ? token : masked}&amp;verbose=true&quot;
              </span>
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

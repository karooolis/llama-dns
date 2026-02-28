"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useDeleteDomainMutation, type Domain } from "@/queries/domains";
import { timeAgo } from "@/lib/format-time";
import { PUBLIC_DOMAIN } from "@/lib/constants";

export function DomainRow({ domain }: { domain: Domain }) {
  const deleteMutation = useDeleteDomainMutation();
  const isTemp = domain.id.startsWith("temp-");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!confirmOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setConfirmOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [confirmOpen]);

  return (
    <div className={`bento-card relative rounded-lg py-3 pr-2 pl-4 ${isTemp ? "opacity-60" : ""}`}>
      <div className="absolute top-3 right-3" ref={popoverRef}>
        <button
          onClick={() => setConfirmOpen(true)}
          disabled={deleteMutation.isPending || isTemp}
          title="Delete"
          className="text-white transition-colors hover:text-neutral-400 disabled:opacity-40"
          type="button"
        >
          <Icon icon="solar:trash-bin-minimalistic-linear" width={14} />
        </button>
        {confirmOpen && (
          <div className="absolute bottom-full left-1/2 z-10 mb-2 w-44 -translate-x-1/2 rounded-lg border border-white/10 bg-card p-3 shadow-xl">
            <p className="mb-2.5 text-xs text-neutral-300">Are you sure?</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="flex-1 rounded-md border border-white/8 bg-white/5 px-2 py-1 text-xs text-neutral-400 transition-colors hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteMutation.mutate(domain.id);
                  setConfirmOpen(false);
                }}
                className="flex-1 rounded-md bg-red-500/15 px-2 py-1 text-xs text-red-400 transition-colors hover:bg-red-500/25"
              >
                Delete
              </button>
            </div>
            {/* Arrow */}
            <div className="absolute left-1/2 -bottom-[5px] -translate-x-1/2 h-[9px] w-[9px] rotate-45 border-r border-b border-white/10 bg-card" />
          </div>
        )}
      </div>
      <p className="flex items-center gap-2 text-sm font-medium text-white">
        {domain.ipv4 || domain.ipv6 ? (
          <Icon
            icon="solar:check-circle-linear"
            width={14}
            className="shrink-0 text-emerald-500/80"
          />
        ) : (
          <Icon
            icon="solar:clock-circle-linear"
            width={14}
            className="shrink-0 text-amber-500/70"
          />
        )}
        {domain.name}.{PUBLIC_DOMAIN}
      </p>
      <div className="mt-1.5 flex items-baseline justify-between gap-3">
        <p className="text-sm text-neutral-500">
          {domain.ipv4 || domain.ipv6 ? (
            <>
              {domain.ipv4 && (
                <>
                  <span className="text-xs text-neutral-600">A</span> {domain.ipv4}
                </>
              )}
              {domain.ipv4 && domain.ipv6 && <span className="text-neutral-600"> / </span>}
              {domain.ipv6 && (
                <>
                  <span className="text-xs text-neutral-600">AAAA</span> {domain.ipv6}
                </>
              )}
            </>
          ) : (
            "No IP set"
          )}
        </p>
        <p className="shrink-0 text-xs text-neutral-600">
          created {timeAgo(domain.createdAt)}
          {domain.updatedAt !== domain.createdAt && ` · updated ${timeAgo(domain.updatedAt)}`}
        </p>
      </div>
    </div>
  );
}

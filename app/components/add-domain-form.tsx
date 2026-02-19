"use client";

import { useState } from "react";
import { useAddDomainMutation } from "@/queries/domains";
import { Button } from "../design-system/components";

export function AddDomainForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const mutation = useAddDomainMutation();

  const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = name.trim().toLowerCase();
    if (!trimmed) return;

    try {
      await mutation.mutateAsync(trimmed);
      setName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add domain");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex items-center bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-1.5 focus-within:border-white/[0.15] transition-all shadow-lg">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="your-project"
          className="bg-transparent border-none placeholder-neutral-600 focus:outline-none w-full text-sm font-mono text-neutral-200 h-10 pl-4 tracking-tight"
          pattern="[a-z0-9][a-z0-9\-]*[a-z0-9]?"
          maxLength={63}
          spellCheck={false}
          autoComplete="off"
        />
        <span className="font-mono text-sm text-neutral-600 select-none tracking-tight pr-2 hidden sm:block">
          .{domain}
        </span>
        <Button
          variant="secondary"
          size="sm"
          type="submit"
          disabled={mutation.isPending || !name.trim()}
          className="ml-1 h-9 px-5 rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
        >
          {mutation.isPending ? "Adding..." : "Claim"}
        </Button>
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      {name.trim() && !error && (
        <p className="text-sm text-neutral-500 font-light">
          Preview: {name.trim().toLowerCase()}.{domain}
        </p>
      )}
    </form>
  );
}

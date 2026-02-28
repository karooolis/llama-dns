"use client";

import { useState } from "react";
import { useAddDomainMutation } from "@/queries/domains";
import { Button } from "./button";

export function AddDomainForm({ initialName }: { initialName?: string } = {}) {
  const [name, setName] = useState(initialName ?? "");
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
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div className="flex items-center rounded-xl border border-white/8 bg-[#0a0a0a] p-1.5 shadow-lg transition-all focus-within:border-white/15">
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="your-project"
          className="h-10 w-full border-none bg-transparent pl-4 font-mono text-sm tracking-tight text-neutral-200 placeholder-neutral-600 focus:outline-none"
          pattern="[a-z0-9][a-z0-9\-]*[a-z0-9]?"
          maxLength={63}
          spellCheck={false}
          autoComplete="off"
        />
        <span className="hidden pr-2 font-mono text-sm tracking-tight text-neutral-600 select-none sm:block">
          .{domain}
        </span>
        <Button
          variant="secondary"
          size="sm"
          type="submit"
          disabled={mutation.isPending || !name.trim()}
          className="ml-1 h-9 shrink-0 cursor-pointer rounded-lg border-white/1 px-5 whitespace-nowrap hover:border-white/15"
        >
          {mutation.isPending ? "Adding..." : "Claim"}
        </Button>
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      {name.trim() && !error && (
        <p className="text-sm font-light text-neutral-500">
          Preview: {name.trim().toLowerCase()}.{domain}
        </p>
      )}
    </form>
  );
}

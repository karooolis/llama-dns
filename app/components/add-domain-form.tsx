"use client";

import { useState } from "react";
import { useAddDomainMutation } from "@/queries/domains";

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
      <div className="flex gap-2">
        <div className="flex flex-1 items-center rounded-lg border border-border bg-card">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="myhost"
            className="w-full bg-transparent px-3 py-2 text-sm outline-none"
            pattern="[a-z0-9][a-z0-9\-]*[a-z0-9]?"
            maxLength={63}
          />
          <span className="whitespace-nowrap pr-3 text-sm text-muted">
            .{domain}
          </span>
        </div>
        <button
          type="submit"
          disabled={mutation.isPending || !name.trim()}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
        >
          {mutation.isPending ? "Adding..." : "Add"}
        </button>
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      {name.trim() && !error && (
        <p className="text-sm text-muted">
          Preview: {name.trim().toLowerCase()}.{domain}
        </p>
      )}
    </form>
  );
}

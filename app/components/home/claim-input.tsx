"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";

export function ClaimInput() {
  const [subdomain, setSubdomain] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn("github", { redirectTo: "/dashboard" });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex max-w-md items-center rounded-xl border border-white/8 bg-[#0a0a0a] p-1.5 shadow-lg transition-all focus-within:border-white/15 md:mx-0">
        <input
          type="text"
          placeholder="your-project"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          className="h-10 w-full border-none bg-transparent pl-4 font-mono text-sm tracking-tight text-neutral-200 placeholder-neutral-600 focus:outline-none"
          spellCheck={false}
          autoComplete="off"
        />
        <span className="hidden pr-2 font-mono text-sm tracking-tight text-neutral-600 select-none sm:block">
          .{domain}
        </span>
        <button
          type="submit"
          className="ml-1 h-9 shrink-0 cursor-pointer rounded-lg border border-white/10 bg-white/8 px-5 text-xs font-semibold tracking-tight whitespace-nowrap text-neutral-300 transition-colors hover:border-white/15 hover:bg-white/12"
        >
          Claim
        </button>
      </div>
    </form>
  );
}

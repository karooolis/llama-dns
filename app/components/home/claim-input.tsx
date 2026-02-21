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
      <div className="flex items-center bg-[#0a0a0a] border border-white/8 rounded-xl p-1.5 focus-within:border-white/15 transition-all shadow-lg max-w-md md:mx-0">
        <input
          type="text"
          placeholder="your-project"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          className="bg-transparent border-none placeholder-neutral-600 focus:outline-none w-full text-sm font-mono text-neutral-200 h-10 pl-4 tracking-tight"
          spellCheck={false}
          autoComplete="off"
        />
        <span className="font-mono text-sm text-neutral-600 select-none tracking-tight pr-2 hidden sm:block">
          .{domain}
        </span>
        <button
          type="submit"
          className="ml-1 h-9 px-5 rounded-lg bg-white/8 border border-white/10 text-neutral-300 text-xs font-semibold hover:bg-white/12 hover:border-white/15 transition-colors tracking-tight whitespace-nowrap shrink-0 cursor-pointer"
        >
          Claim
        </button>
      </div>
    </form>
  );
}

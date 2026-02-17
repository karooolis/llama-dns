"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "llamadns.org";

export function ClaimInput() {
  const [subdomain, setSubdomain] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signIn("github", { redirectTo: "/dashboard" });
  }

  return (
    <div className="max-w-md mx-auto mb-16 relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-700" />
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-[#0C0C0C] border border-white/10 rounded-lg p-1.5 shadow-2xl transition-colors focus-within:border-white/20"
      >
        <div className="pl-3 pr-2 text-gray-500 select-none flex items-center">
          <Icon icon="solar:magnifer-linear" className="text-lg" />
        </div>
        <input
          type="text"
          placeholder="project-name"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          className="bg-transparent border-none text-gray-200 placeholder-gray-600 focus:ring-0 w-full text-sm font-mono h-9 outline-none"
        />
        <div className="pr-3 text-gray-600 font-mono text-sm select-none tracking-tight">
          .{domain}
        </div>
        <button
          type="submit"
          className="bg-white text-black hover:bg-gray-200 px-3 py-1.5 rounded text-xs font-medium transition-colors"
        >
          Claim
        </button>
      </form>
      <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-gray-600 font-medium uppercase tracking-widest">
        <span className="flex items-center gap-1">
          <Icon icon="solar:check-circle-linear" className="text-emerald-500/80" />
          Free Forever
        </span>
        <span className="flex items-center gap-1">
          <Icon icon="solar:check-circle-linear" className="text-emerald-500/80" />
          No Credit Card
        </span>
      </div>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";

export function NavAuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => signIn("github", { redirectTo: "/dashboard" })}
        className="text-xs font-medium text-gray-400 hover:text-white transition-colors hidden sm:block cursor-pointer"
      >
        Log in
      </button>
      <button
        onClick={() => signIn("github", { redirectTo: "/dashboard" })}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer"
      >
        Sign up
        <Icon icon="solar:arrow-right-linear" width={12} />
      </button>
    </div>
  );
}

"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/" })}
      className="text-sm text-muted transition-colors hover:text-foreground"
    >
      Sign out
    </button>
  );
}

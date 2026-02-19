"use client";

import { signOut } from "next-auth/react";
import { Button } from "../design-system/components";

export function SignOutButton() {
  return (
    <Button variant="secondary" size="sm" onClick={() => signOut({ redirectTo: "/" })}>
      Sign out
    </Button>
  );
}

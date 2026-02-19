"use client";

import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Button } from "../design-system/components";

export function NavAuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signIn("github", { redirectTo: "/dashboard" })}
        className="hidden sm:block cursor-pointer"
      >
        Log in
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => signIn("github", { redirectTo: "/dashboard" })}
        className="flex items-center gap-2 cursor-pointer"
      >
        Sign up
      </Button>
    </div>
  );
}

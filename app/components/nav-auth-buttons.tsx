"use client";

import { signIn } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Button } from "./button";

export function NavAuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signIn("github", { redirectTo: "/dashboard" })}
        className="hidden cursor-pointer sm:block"
      >
        Log in
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => signIn("github", { redirectTo: "/dashboard" })}
        className="flex cursor-pointer items-center gap-2"
      >
        Sign up
      </Button>
    </div>
  );
}

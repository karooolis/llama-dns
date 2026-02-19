"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "../design-system/components";

export function NavUserButtons() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="flex items-center gap-4">
      {isDashboard ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => signOut({ redirectTo: "/" })}
          className="cursor-pointer"
        >
          Sign out
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => (window.location.href = "/dashboard")}
          className="cursor-pointer"
        >
          Dashboard
        </Button>
      )}
    </div>
  );
}

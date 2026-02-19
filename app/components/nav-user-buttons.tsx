"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react";
import { Button } from "../design-system/components";

interface NavUserButtonsProps {
  user: {
    name?: string | null;
    image?: string | null;
  };
}

export function NavUserButtons({ user }: NavUserButtonsProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="flex items-center gap-4">
      {user.image && (
        <img src={user.image} alt="" className="h-7 w-7 rounded-full" />
      )}
      <span className="text-xs text-neutral-500 hidden sm:block">
        {user.name}
      </span>
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
          className="flex items-center gap-2 cursor-pointer"
        >
          Dashboard
          <Icon icon="solar:arrow-right-linear" width={12} />
        </Button>
      )}
    </div>
  );
}

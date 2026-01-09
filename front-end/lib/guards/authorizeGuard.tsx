// lib/features/Auth/components/RequireGuest.tsx
"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Routes } from "@/app/routes";
import { useAuth } from "@/lib/features/Auth/context/AuthContext";

interface RequireGuestProps {
  forLoggedIn: boolean;
}

function AuthorizeGuard({ children, forLoggedIn }: PropsWithChildren<RequireGuestProps>) {
  const { isAuthenticated } = useAuth();
  
  if (forLoggedIn && isAuthenticated) {
    return <>{children}</>;
  }

  if (!forLoggedIn && !isAuthenticated) {
    return <>{children}</>;
  }

  return null;
}

export default AuthorizeGuard;

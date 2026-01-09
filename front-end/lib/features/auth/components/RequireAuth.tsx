"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/lib/ui/loader/loader";
import { Routes } from "@/app/routes";
import { useAuth } from "../context/AuthContext";

interface RequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(Routes.Login);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <Loader />;
  }

  return <>{children}</>;
}


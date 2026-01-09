"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getMe } from "@/lib/api/user";
import { login as apiLogin, register as apiRegister, refresh as apiRefresh, logout } from "@/lib/api/auth";
import { type LoginPayload, type RegisterPayload } from "@/lib/api/types";
import { type User } from "@/lib/types";
import { Routes } from "@/app/routes";
import { useRouter } from "next/navigation";

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  revalidate: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      const { user } = await getMe();

      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const revalidate = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchUser();
    } finally {
      setIsLoading(false);
    }
  }, [fetchUser]);

  const handleLogin = useCallback(
    async (payload: LoginPayload) => {
      await apiLogin(payload);
      await fetchUser();
    },
    [fetchUser]
  );

  const handleRegister = useCallback(
    async (payload: RegisterPayload) => {
      await apiRegister(payload);
      await fetchUser();
    },
    [fetchUser]
  );

  const handleLogout = useCallback(async () => {
    await logout();
    setUser(null);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login: handleLogin,
      register: handleRegister,
      logout: handleLogout,
      revalidate,
    }),
    [user, isLoading, handleLogin, handleRegister, handleLogout, revalidate]
  );

  useEffect(() => {
    if (!isLoading && !Boolean(user)) {
      router.push(Routes.Login);
    } else if (!isLoading && Boolean(user)) {
      router.push(Routes.Home);
    }
  }, [isLoading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}


import { request } from "./client";
import { type LoginPayload, type RegisterPayload } from "./types";

type AuthResponse = {
  message: string;
};

export async function login(payload: LoginPayload) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function register(payload: RegisterPayload) {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logout() {
  return request<{ message: string }>("/auth/logout", { method: "POST" });
}

export async function refresh() {
  return request<AuthResponse>("/auth/refresh", { method: "POST" });
}


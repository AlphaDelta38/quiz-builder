import { request } from "./client";
import { type FetchQuizzesParams } from "./types";
import { type Quiz } from "@/lib/types/quiz";
import { type User } from "@/lib/types";

export async function getMe() {
  return request<{ user: User }>("/user/me", { method: "GET" });
}

export async function getMyQuizzes(params?: FetchQuizzesParams) {
  const search = new URLSearchParams();

  if (params?.page) search.set("page", params.page.toString());
  if (params?.limit) search.set("limit", params.limit.toString());

  const query = search.toString();
  const url = query ? `/user/my-quizzes?${query}` : "/user/my-quizzes";

  return request<Quiz[]>(url, { method: "GET" });
}

export async function deleteMyQuiz(id: string | number) {
  return request<void>(`/user/my-quizzes/${id}`, { method: "DELETE" });
}


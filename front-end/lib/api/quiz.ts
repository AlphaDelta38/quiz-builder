import { request } from "./client";
import { type FetchQuizzesParams, type CreateQuizRequest } from "./types";
import { type Quiz } from "@/lib/types/quiz";

export async function fetchQuizzes(params?: FetchQuizzesParams) {
  const search = new URLSearchParams();

  if (params?.page) search.set("page", params.page.toString());
  if (params?.limit) search.set("limit", params.limit.toString());

  const query = search.toString();
  const url = query ? `/quizze?${query}` : "/quizze";

  return request<Quiz[]>(url, {
    method: "GET",
  });
}

export async function fetchQuiz(id: string | number) {
  return request<Quiz>(`/quizze/${id}`, {
    method: "GET",
  });
}

export async function createQuiz(payload: CreateQuizRequest) {
  return request<Quiz>("/quizze", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}


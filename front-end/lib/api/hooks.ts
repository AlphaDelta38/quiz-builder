"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createQuiz,
  fetchQuiz,
  fetchQuizzes,
} from "./quiz";
import { login, logout, register } from "./auth";
import { deleteMyQuiz, getMe, getMyQuizzes } from "./user";
import {
  type CreateQuizRequest,
  type FetchQuizzesParams,
  type LoginPayload,
  type RegisterPayload,
} from "./types";
import { type Quiz } from "@/lib/types/quiz";
import { type User } from "@/lib/types";

export const queryKeys = {
  quizzes: (params?: FetchQuizzesParams) => ["quizzes", params] as const,
  quiz: (id: string | number) => ["quiz", id] as const,
  me: ["me"] as const,
  myQuizzes: ["my-quizzes"] as const,
};

export function useQuizzesQuery(params?: FetchQuizzesParams) {
  return useQuery({
    queryKey: queryKeys.quizzes(params),
    queryFn: () => fetchQuizzes(params),
  });
}

export function useQuizQuery(id: string | number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.quiz(id),
    queryFn: () => fetchQuiz(id),
    enabled,
  });
}

export function useCreateQuizMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateQuizRequest) => createQuiz(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.myQuizzes });
    },
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.me });
    },
  });
}

export function useMeQuery() {
  return useQuery<User>({
    queryKey: queryKeys.me,
    queryFn: () => getMe().then((res) => res.user),
  });
}

export function useMyQuizzesQuery(params?: FetchQuizzesParams) {
  return useQuery<Quiz[]>({
    queryKey: queryKeys.myQuizzes,
    queryFn: () => getMyQuizzes(params),
  });
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: () => logout(),
  });
}
export function useDeleteQuizMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteMyQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.myQuizzes });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
}


"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { type FieldErrors } from "react-hook-form";
import { type CreateQuestion } from "@/lib/types/quiz";

type QuestionFormContextValue = {
  question: CreateQuestion;
  index: number;
  canDelete: boolean;
  errors?: FieldErrors<CreateQuestion>;
  updateQuestion: (
    next: CreateQuestion | ((prev: CreateQuestion) => CreateQuestion)
  ) => void;
  remove: () => void;
};

const QuestionFormContext = createContext<QuestionFormContextValue | null>(
  null
);

type QuestionFormProviderProps = PropsWithChildren<{
  question: CreateQuestion;
  index: number;
  canDelete: boolean;
  errors?: FieldErrors<CreateQuestion>;
  onChange: (question: CreateQuestion) => void;
  onDelete: () => void;
}>;

export function QuestionFormProvider({
  children,
  question,
  index,
  canDelete,
  errors,
  onChange,
  onDelete,
}: QuestionFormProviderProps) {
  const updateQuestion = useCallback(
    (next: QuestionFormContextValue["question"] | ((prev: CreateQuestion) => CreateQuestion)) => {
      const nextValue =
        typeof next === "function" ? (next as (prev: CreateQuestion) => CreateQuestion)(question) : next;
      onChange(nextValue);
    },
    [onChange, question]
  );

  const value = useMemo(
    () => ({
      question,
      index,
      canDelete,
      errors,
      updateQuestion,
      remove: onDelete,
    }),
    [question, index, canDelete, errors, updateQuestion, onDelete]
  );

  return (
    <QuestionFormContext.Provider value={value}>
      {children}
    </QuestionFormContext.Provider>
  );
}

export const useQuestionForm = () => {
  const context = useContext(QuestionFormContext);

  if (!context) {
    throw new Error("useQuestionForm must be used within QuestionFormProvider");
  }

  return context;
};


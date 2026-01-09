"use client";

import { useQuizQuery } from "@/lib/api/hooks";
import { QuizPreview } from "@/lib/features/Quiz/widgets/QuizPreview";
import Loader from "@/lib/ui/loader/loader";
import { useParams } from "next/navigation";

export default function QuizPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { data: quiz, isLoading, isError } = useQuizQuery(id ?? "", Boolean(id));

  if (isLoading) return <Loader />;
  if (isError || !quiz) return <div>Failed to load quiz</div>;

  return <QuizPreview quiz={quiz} />;
}
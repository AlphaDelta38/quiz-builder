"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { QuizList } from "../../components/QuizList";
import { Routes } from "@/app/routes";
import styles from "./AllQuizzes.module.scss";
import { useQuizzesQuery } from "@/lib/api/hooks";
import InfiniteLoader from "@/lib/ui/loader/loader";
import { type Quiz } from "@/lib/types/quiz";
import { useAuth } from "@/lib/features/Auth/context/AuthContext";

export function AllQuizzes() {
  const { data, isLoading, isError, error } = useQuizzesQuery();
  const quizzes = data ?? [];
  const { isAuthenticated } = useAuth();

  const totalQuestions = quizzes.reduce((acc: number, quiz: Quiz) => {
    return acc + (quiz.questions?.length ?? 0);
  }, 0);

  return (
    <div className={styles.section}>
      <div className={styles.pageHeader}>
        <nav className={styles.breadcrumb}>
          <Link href={Routes.Home} className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight size={14} className={styles.breadcrumbSeparator} />
          <span className={styles.breadcrumbCurrent}>Quizzes</span>
        </nav>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{quizzes.length}</span>
            <span className={styles.statLabel}>Total Quizzes</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{totalQuestions}</span>
            <span className={styles.statLabel}>Questions</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <InfiniteLoader />
      ) : isError ? (
        <div className={styles.error}>
          Failed to load quizzes: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      ) : (
        <QuizList
          quizzes={quizzes}
          title="All Quizzes"
          subtitle="Explore all available quizzes"
          showCreateButton={isAuthenticated}
          emptyTitle="No quizzes available"
          emptyDescription="Be the first to create a quiz and share it with the community!"
        />
      )}
    </div>
  );
}


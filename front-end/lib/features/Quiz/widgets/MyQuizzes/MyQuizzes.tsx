"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Routes } from "@/app/routes";
import { useMyQuizzesQuery } from "@/lib/api/hooks";
import { QuizList } from "../../components/QuizList";
import styles from "./MyQuizzes.module.scss";
import Loader from "@/lib/ui/loader/loader";

export function MyQuizzes() {
  const { data, isLoading, isError, error } = useMyQuizzesQuery();
  const quizzes = data ?? [];

  return (
    <div className={styles.section}>
      <div className={styles.pageHeader}>
        <nav className={styles.breadcrumb}>
          <Link href={Routes.Home} className={styles.breadcrumbLink}>
            Home
          </Link>
          <ChevronRight size={14} className={styles.breadcrumbSeparator} />
          <Link href={Routes.Quizzes} className={styles.breadcrumbLink}>
            Quizzes
          </Link>
          <ChevronRight size={14} className={styles.breadcrumbSeparator} />
          <span className={styles.breadcrumbCurrent}>My Quizzes</span>
        </nav>
      </div>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className={styles.error}>
          Failed to load your quizzes: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      ) : (
        <QuizList
          quizzes={quizzes}
          title="My Quizzes"
          subtitle="Quizzes you have created"
          showCreateButton
          emptyTitle="You have no quizzes yet"
          emptyDescription="Create your first quiz to see it here."
        />
      )}
    </div>
  );
}


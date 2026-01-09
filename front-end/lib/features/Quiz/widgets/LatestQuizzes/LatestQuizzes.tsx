"use client";

import Link from "next/link";
import { Button } from "@/lib/components";
import { QuizList } from "../../components/QuizList";
import { AuthRoutes, Routes } from "@/app/routes";
import styles from "./LatestQuizzes.module.scss";
import { useQuizzesQuery } from "@/lib/api/hooks";
import InfiniteLoader from "@/lib/ui/loader/loader";
import { useAuth } from "@/lib/features/Auth/context/AuthContext";

export function LatestQuizzes() {
  const { data, isLoading, isError, error } = useQuizzesQuery({ limit: 10 });
  const quizzes = data ?? [];
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.section}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Quiz Builder</h1>
        <p className={styles.heroSubtitle}>
          Create, share, and discover amazing quizzes. Test your knowledge or challenge others with your own questions.
        </p>
        <div className={styles.heroCta}>
          <Link href={AuthRoutes.QuizzesCreate}>
            <Button variant="primary" size="lg" disabled={!isAuthenticated}>
              Create Quiz
            </Button>
          </Link>
          <Link href={Routes.Quizzes}>
            <Button variant="outline" size="lg">
              Browse Quizzes
            </Button>
          </Link>
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
          title="Latest Quizzes"
          subtitle="Discover the newest quizzes from our community"
          emptyTitle="No quizzes available"
          emptyDescription="Create the first quiz and start building the community!"
        />
      )}

      {quizzes.length > 0 && !isLoading && !isError && (
        <div className={styles.viewAllLink}>
          <Link href={Routes.Quizzes}>
            <Button variant="ghost">View All Quizzes →</Button>
          </Link>
        </div>
      )}
    </div>
  );
}


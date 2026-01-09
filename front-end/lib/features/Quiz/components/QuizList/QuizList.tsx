"use client";

import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Quiz } from "@/lib/types/quiz";
import { Button } from "@/lib/components";
import { QuizCard } from "../QuizCard";
import { AuthRoutes } from "@/app/routes";
import styles from "./QuizList.module.scss";

interface QuizListProps {
  quizzes: Quiz[];
  title?: string;
  subtitle?: string;
  showCreateButton?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function QuizList({
  quizzes,
  title,
  subtitle,
  showCreateButton = false,
  emptyTitle = "No quizzes yet",
  emptyDescription = "Be the first to create a quiz and share your knowledge with others!",
}: QuizListProps) {
  if (quizzes.length === 0) {
    return (
      <div className={styles.container}>
        {(title || showCreateButton) && (
          <div className={styles.header}>
            {title && (
              <div className={styles.titleSection}>
                <h2 className={styles.title}>{title}</h2>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              </div>
            )}
          </div>
        )}
        <div className={styles.emptyState}>

          <div className={styles.emptyIcon}>
            <FileQuestion size={32} />
          </div>

          <h3 className={styles.emptyTitle}>{emptyTitle}</h3>
          
          <p className={styles.emptyDescription}>{emptyDescription}</p>
          
          <Link href={AuthRoutes.QuizzesCreate}>
            <Button variant="primary">Create Quiz</Button>
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {(title || showCreateButton) && (
        <div className={styles.header}>
          {title && (
            <div className={styles.titleSection}>
              <h2 className={styles.title}>{title}</h2>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          )}

          {showCreateButton && (
            <Link href={AuthRoutes.QuizzesCreate}>
              <Button variant="primary">Create Quiz</Button>
            </Link>
          )}

        </div>
      )}

      <div className={styles.grid}>
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
      
    </div>
  );
}


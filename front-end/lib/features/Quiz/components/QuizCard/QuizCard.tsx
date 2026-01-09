"use client";

import Link from "next/link";
import { HelpCircle, Calendar } from "lucide-react";
import { Quiz } from "@/lib/types/quiz";
import styles from "./QuizCard.module.scss";
import getInitials from "@/lib/utils/get-initials";

interface QuizCardProps {
  quiz: Quiz;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function QuizCard({ quiz }: QuizCardProps) {
  const questionCount = quiz.questions?.length ?? 0;

  return (
    <Link href={`/quizzes/${quiz.id}`} className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{quiz.title}</h3>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <HelpCircle size={16} className={styles.metaIcon} />
          <span>{questionCount} question{questionCount !== 1 ? "s" : ""}</span>
        </div>
        <div className={styles.metaItem}>
          <Calendar size={16} className={styles.metaIcon} />
          <span>{formatDate(quiz.createdAt)}</span>
        </div>
      </div>

      <div className={styles.footer}>
        {quiz.owner && (
          <div className={styles.author}>
            <div className={styles.authorAvatar}>
              {getInitials(quiz.owner.username)}
            </div>
            <span className={styles.authorName}>{quiz.owner.username}</span>
          </div>
        )}

        {!quiz.owner && <div />}

        <span className={styles.date}>Updated {formatDate(quiz.updatedAt)}</span>
      </div>
    </Link>
  );
}


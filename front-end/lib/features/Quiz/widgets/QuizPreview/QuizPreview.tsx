"use client";

import Link from "next/link";
import { ChevronRight, Lock, Eye, HelpCircle, Calendar, FileQuestion, AlertCircle } from "lucide-react";
import { Quiz } from "@/lib/types/quiz";
import { Button } from "@/lib/components";
import { QuestionPreview } from "../../components/QuestionPreview";
import { Routes } from "@/app/routes";
import getInitials from "@/lib/utils/get-initials";
import styles from "./QuizPreview.module.scss";

interface QuizPreviewProps {
  quiz: Quiz | null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}


export function QuizPreview({ quiz }: QuizPreviewProps) {
  if (!quiz) {
    return (
      <div className={styles.section}>
        <div className={styles.notFound}>
          <div className={styles.notFoundIcon}>
            <AlertCircle size={40} />
          </div>
          <h2 className={styles.notFoundTitle}>Quiz Not Found</h2>
          <p className={styles.notFoundText}>
            The quiz you're looking for doesn't exist or has been removed.
          </p>
          <Link href={Routes.Quizzes}>
            <Button variant="primary">Browse Quizzes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const questionCount = quiz.questions?.length ?? 0;

  return (
    <div className={styles.section}>
      <nav className={styles.breadcrumb}>
        <Link href={Routes.Home} className={styles.breadcrumbLink}>
          Home
        </Link>
        <ChevronRight size={14} className={styles.breadcrumbSeparator} />
        <Link href={Routes.Quizzes} className={styles.breadcrumbLink}>
          Quizzes
        </Link>
        <ChevronRight size={14} className={styles.breadcrumbSeparator} />
        <span className={styles.breadcrumbCurrent}>{quiz.title}</span>
      </nav>

      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>{quiz.title}</h1>
          <div className={styles.badges}>
            {quiz.isPrivate && (
              <span className={`${styles.badge} ${styles.privateBadge}`}>
                <Lock size={12} />
                Private
              </span>
            )}
            <span className={`${styles.badge} ${styles.previewBadge}`}>
              <Eye size={12} />
              Preview Mode
            </span>
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <HelpCircle size={18} className={styles.metaIcon} />
            <span>{questionCount} question{questionCount !== 1 ? "s" : ""}</span>
          </div>
          <div className={styles.metaItem}>
            <Calendar size={18} className={styles.metaIcon} />
            <span>Created {formatDate(quiz.createdAt)}</span>
          </div>
        </div>

        {quiz.owner && (
          <div className={styles.author}>
            <div className={styles.authorAvatar}>
              {getInitials(quiz.owner.username)}
            </div>
            <div className={styles.authorInfo}>
              <span className={styles.authorLabel}>Created by</span>
              <span className={styles.authorName}>{quiz.owner.username}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.questionsSection}>
        <h2 className={styles.sectionTitle}>
          Questions
          <span className={styles.questionCount}>{questionCount}</span>
        </h2>

        {questionCount > 0 ? (
          <div className={styles.questionsList}>
            {quiz.questions!.map((question, index) => (
              <QuestionPreview key={question.id} question={question} index={index} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyQuestions}>
            <div className={styles.emptyIcon}>
              <FileQuestion size={28} />
            </div>
            <p className={styles.emptyText}>This quiz doesn't have any questions yet.</p>
          </div>
        )}
      </div>

      <div className={styles.backButton}>
        <Link href={Routes.Quizzes}>
          <Button variant="outline">← Back to Quizzes</Button>
        </Link>
      </div>
    </div>
  );
}


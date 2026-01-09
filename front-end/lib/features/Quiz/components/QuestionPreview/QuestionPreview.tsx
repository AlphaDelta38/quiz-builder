"use client";

import { List, ToggleLeft, Type } from "lucide-react";
import { Question, QuestionType } from "@/lib/types/quiz";
import styles from "./QuestionPreview.module.scss";
import MultiAnswers from "../../ui/multi-answers";
import BooleanAnswer from "../../ui/bolean-answer";
import InputAnswer from "../../ui/input-answer";

interface QuestionPreviewProps {
  question: Question;
  index: number;
}

const typeLabels: Record<QuestionType, { label: string; icon: React.ReactNode }> = {
  [QuestionType.MULTI]: { label: "Multiple Choice", icon: <List size={14} /> },
  [QuestionType.BOOLEAN]: { label: "True / False", icon: <ToggleLeft size={14} /> },
  [QuestionType.TEXT]: { label: "Text Answer", icon: <Type size={14} /> },
};

export function QuestionPreview({ question, index }: QuestionPreviewProps) {
  const { label, icon } = typeLabels[question.type];

  const renderAnswers = () => {
    switch (question.type) {
      case QuestionType.MULTI:
        return (
          <MultiAnswers answers={question.multiContent?.answers} />
        );

      case QuestionType.BOOLEAN:
        return (
          <BooleanAnswer booleanContent={question.booleanContent} />
        );

      case QuestionType.TEXT:
        return (
          <InputAnswer />
        );

      default:
        return null;
    }
  };

  const getQuestionContent = (): string => {
    switch (question.type) {
      case QuestionType.MULTI:
        return question.multiContent?.content ?? "";
      case QuestionType.BOOLEAN:
        return question.booleanContent?.content ?? "";
      case QuestionType.TEXT:
        return question.textContent?.content ?? "";
      default:
        return "";
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.questionNumber}>Q{index + 1}</span>
        <span className={`${styles.typeBadge} ${styles[question.type]}`}>
          {icon}
          {label}
        </span>
      </div>

      <p className={styles.content}>{getQuestionContent()}</p>

      {renderAnswers()}
    </div>
  );
}


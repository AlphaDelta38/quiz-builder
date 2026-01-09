"use client";

import { List, ToggleLeft, Type, Trash2 } from "lucide-react";
import { QuestionType, CreateQuestion, type CreateQuestionMulti } from "@/lib/types/quiz";
import styles from "./QuestionForm.module.scss";
import InputAnswer from "../../ui/input-answer";
import MultiAnswersForm from "../../ui/MultiAnswersForm";
import BooleanAnswerForm from "../../ui/BooleanAnswerForm";
import {
  QuestionFormProvider,
  useQuestionForm,
} from "./QuestionFormContext";
import { type FieldErrors } from "react-hook-form";
import { useState, useEffect } from "react";

interface QuestionFormProps {
  question: CreateQuestion;
  index: number;
  onChange: (question: CreateQuestion) => void;
  onDelete: () => void;
  canDelete: boolean;
  errors?: FieldErrors<CreateQuestion>;
}

const typeOptions = [
  { type: QuestionType.MULTI, label: "Multiple", icon: <List size={14} /> },
  { type: QuestionType.BOOLEAN, label: "True/False", icon: <ToggleLeft size={14} /> },
  { type: QuestionType.TEXT, label: "Text", icon: <Type size={14} /> },
];

export function QuestionForm({
  question,
  index,
  onChange,
  onDelete,
  canDelete,
  errors,
}: QuestionFormProps) {
  return (
    <QuestionFormProvider
      question={question}
      index={index}
      onChange={onChange}
      onDelete={onDelete}
      canDelete={canDelete}
      errors={errors}
    >
      <QuestionCard />
    </QuestionFormProvider>
  );
}

function QuestionCard() {
  const { question, index, canDelete, remove, updateQuestion, errors } =
    useQuestionForm();
  
  const [localContent, setLocalContent] = useState(question.content);
  
  useEffect(() => {
    setLocalContent(question.content);
  }, [question.content]);

  const handleTypeChange = (newType: QuestionType) => {
    if (newType === question.type) return;

    switch (newType) {
      case QuestionType.MULTI:
        updateQuestion({
          type: QuestionType.MULTI,
          content: localContent,
          answers: [
            { content: "", isCorrect: true },
            { content: "", isCorrect: false },
          ],
        });
        break;
      case QuestionType.BOOLEAN:
        updateQuestion({
          type: QuestionType.BOOLEAN,
          content: localContent,
          isCorrect: true,
        });
        break;
      case QuestionType.TEXT:
        updateQuestion({
          type: QuestionType.TEXT,
          content: localContent,
        });
        break;
    }
  };

  const handleContentChange = (content: string) => {
    setLocalContent(content);
  };

  const handleBlur = () => {
    if (localContent !== question.content) {
      updateQuestion({ ...question, content: localContent });
    }
  };

  const renderAnswerSection = () => {
    switch (question.type) {
      case QuestionType.MULTI:
        return <MultiAnswersForm />;

      case QuestionType.BOOLEAN:
        return <BooleanAnswerForm />;

      case QuestionType.TEXT:
        return (
          <InputAnswer placeholder="Text questions require manual answer evaluation" />
        );

      default:
        return null;
    }
  };

  const contentError =
    typeof errors?.content === "object" &&
    errors.content &&
    "message" in errors.content
      ? (errors.content.message as string)
      : undefined;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.questionNumber}>Q{index + 1}</span>
          <div className={styles.typeSelector}>
            {typeOptions.map((option) => (
              <button
                key={option.type}
                type="button"
                className={`${styles.typeButton} ${
                  question.type === option.type ? styles.active : ""
                }`}
                onClick={() => handleTypeChange(option.type)}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        </div>
        {canDelete && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={remove}
            title="Delete question"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className={styles.content}>
        <textarea
          className={`${styles.contentInput} ${
            contentError ? styles.hasError : ""
          }`}
          value={localContent}
          onChange={(e) => handleContentChange(e.target.value)}
          onBlur={handleBlur}
          placeholder="Enter your question here..."
          rows={2}
        />
        {contentError && <span className={styles.error}>{contentError}</span>}
      </div>

      {renderAnswerSection()}
    </div>
  );
}


"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { QuestionType, type CreateQuestion } from "@/lib/types/quiz";
import { Input, Button } from "@/lib/components";
import { QuestionForm } from "../../components/QuestionForm";
import { Routes } from "@/app/routes";
import styles from "./CreateQuiz.module.scss";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateQuizMutation } from "@/lib/api/hooks";
import { type CreateQuizRequest } from "@/lib/api/types";

const createEmptyQuestion = (): CreateQuestion => ({
  type: QuestionType.MULTI,
  content: "",
  answers: [
    { content: "", isCorrect: true },
    { content: "", isCorrect: false },
  ],
});

const multiAnswerSchema = z.object({
  content: z.string().min(1, "Answer content is required"),
  isCorrect: z.boolean(),
});

const questionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(QuestionType.TEXT),
    content: z.string().min(1, "Content is required"),
  }),
  z.object({
    type: z.literal(QuestionType.BOOLEAN),
    content: z.string().min(1, "Content is required"),
    isCorrect: z.boolean(),
  }),
  z.object({
    type: z.literal(QuestionType.MULTI),
    content: z.string().min(1, "Content is required"),
    answers: z
      .array(multiAnswerSchema)
      .min(2, "At least 2 answers required"),
  }),
]);

const quizFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isPrivate: z.boolean().default(false),
  questions: z
    .array(questionSchema)
    .min(1, "Add at least one question"),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

export function CreateQuiz() {
  const router = useRouter();
  const createQuizMutation = useCreateQuizMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: "",
      isPrivate: false,
      questions: [createEmptyQuestion()],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = watch("questions");

  const handleQuestionChange = (index: number, question: CreateQuestion) => {
    update(index, question);
  };

  const handleAddQuestion = () => {
    append(createEmptyQuestion());
  };

  const handleDeleteQuestion = (index: number) => {
    if (fields.length <= 1) return;
    remove(index);
  };

  const onSubmit = handleSubmit(async (values: QuizFormValues) => {
    setApiError(null);

    try {
      const payload: CreateQuizRequest = {
        quiz: {
          title: values.title,
          isPrivate: values.isPrivate,
        },
        newQuestions: values.questions.map((question: QuizFormValues["questions"][number]) => {
          const base = {
            questionData: { type: question.type },
          } as CreateQuizRequest["newQuestions"][number];

          switch (question.type) {
            case QuestionType.TEXT:
              return {
                ...base,
                textContent: { content: question.content },
              };
            case QuestionType.BOOLEAN:
              return {
                ...base,
                booleanContent: {
                  content: question.content,
                  isCorrect: question.isCorrect,
                },
              };
            case QuestionType.MULTI:
              return {
                ...base,
                multiContent: {
                  content: question.content,
                  answers: question.answers,
                },
              };
          }
        }),
        questionsIds: [],
      };

      await createQuizMutation.mutateAsync(payload);
      router.push(Routes.Quizzes);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Failed to create quiz. Please try again."
      );
    }
  });

  const handleCancel = () => {
    router.push(Routes.Quizzes);
  };

  const isSubmitting = createQuizMutation.isPending;

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
        <span className={styles.breadcrumbCurrent}>Create Quiz</span>
      </nav>

      <div className={styles.header}>
        <h1 className={styles.title}>Create New Quiz</h1>
        <p className={styles.subtitle}>
          Build your quiz by adding questions and setting up answer options
        </p>
      </div>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.basicInfo}>
          <h2 className={styles.basicInfoTitle}>Basic Information</h2>
          <div className={styles.basicInfoFields}>
            <Input
              label="Quiz Title"
              type="text"
              placeholder="Enter quiz title..."
              error={errors.title?.message}
              {...register("title")}
              fullWidth
            />
            <label className={styles.privateToggle}>
              <input
                type="checkbox"
                className={styles.checkbox}
                {...register("isPrivate")}
              />
              <span className={styles.privateLabel}>
                <span className={styles.privateLabelText}>Private Quiz</span>
                <span className={styles.privateLabelHint}>
                  Only you can see this quiz when enabled
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className={styles.questionsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Questions
              <span className={styles.questionCount}>{questions.length}</span>
            </h2>
          </div>

          <div className={styles.questionsList}>
            {fields.map((field: FieldArrayWithId<QuizFormValues, "questions", "id">, index: number) => {
              const question = questions?.[index] ?? createEmptyQuestion();
              return (
              <QuestionForm
                key={field.id}
                question={question}
                index={index}
                onChange={(q) => handleQuestionChange(index, q)}
                onDelete={() => handleDeleteQuestion(index)}
                canDelete={questions.length > 1}
                errors={
                  Array.isArray(errors.questions)
                    ? errors.questions[index]
                    : undefined
                }
              />
            )})}
          </div>

          <button
            type="button"
            className={styles.addQuestionButton}
            onClick={handleAddQuestion}
          >
            <Plus size={20} />
            Add Question
          </button>
        </div>

        <div className={styles.actions}>
          {apiError && <div className={styles.errorBanner}>{apiError}</div>}
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
          >
            Create Quiz
          </Button>
        </div>
      </form>
    </div>
  );
}


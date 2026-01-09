import { Check, Plus, X } from "lucide-react";
import { QuestionType, type CreateMultiAnswer, type CreateQuestionMulti } from "@/lib/types/quiz";
import { useQuestionForm } from "../../components/QuestionForm/QuestionFormContext";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";

function MultiAnswersForm() {
	const { question, updateQuestion } = useQuestionForm();

	if (question.type !== QuestionType.MULTI) {
		return null;
	}

	const answers = question.answers ?? [];
	const [localAnswers, setLocalAnswers] = useState<CreateMultiAnswer[]>(answers);

	useEffect(() => {
		setLocalAnswers(answers);
	}, [answers]);

	const syncAnswersToParent = (nextAnswers: CreateMultiAnswer[]) => {
		updateQuestion((prev) => {
			const prevMulti = prev as CreateQuestionMulti;
			return { ...prevMulti, answers: nextAnswers };
		});
	};

	const handleMultiCorrectToggle = (answerIndex: number) => {
		const nextAnswers = localAnswers.map((answer, idx) =>
			idx === answerIndex
				? { ...answer, isCorrect: !answer.isCorrect }
				: answer
		);
		setLocalAnswers(nextAnswers);
		syncAnswersToParent(nextAnswers);
	};

	const handleMultiAnswerChange = (answerIndex: number, content: string) => {
		setLocalAnswers((prev) =>
			prev.map((answer, idx) =>
				idx === answerIndex
					? { ...answer, content }
					: answer
			)
		);
	};

	const handleAnswerBlur = () => {
		syncAnswersToParent(localAnswers);
	};

	const handleRemoveAnswer = (answerIndex: number) => {
		if (localAnswers.length <= 2) return;

		const removedWasCorrect = localAnswers[answerIndex]?.isCorrect;
		const nextAnswers = localAnswers.filter((_, idx) => idx !== answerIndex);

		if (removedWasCorrect && nextAnswers.length > 0) {
			nextAnswers[0] = { ...nextAnswers[0], isCorrect: true };
		}

		setLocalAnswers(nextAnswers);
		syncAnswersToParent(nextAnswers);
	};

	const handleAddAnswer = () => {
		const nextAnswers = [
			...localAnswers,
			{ content: "", isCorrect: false },
		];
		setLocalAnswers(nextAnswers);
		syncAnswersToParent(nextAnswers);
	};

	return (
		<div className={styles.answersSection}>
			<label className={styles.answersLabel}>Answer Options</label>
			<div className={styles.answers}>
				{localAnswers.map((answer, answerIndex) => (
					<div key={answerIndex} className={styles.answerRow}>
						<button
							type="button"
							className={`${styles.correctToggle} ${answer.isCorrect ? styles.active : ""}`}
							onClick={() => handleMultiCorrectToggle(answerIndex)}
							title={answer.isCorrect ? "Correct answer" : "Mark as correct"}
						>
							<Check size={16} />
						</button>
						<input
							type="text"
							className={styles.answerInput}
							value={answer.content}
							onChange={(e) => handleMultiAnswerChange(answerIndex, e.target.value)}
							onBlur={handleAnswerBlur}
							placeholder={`Answer option ${answerIndex + 1}`}
						/>

						{localAnswers.length > 2 && (
							<button
								type="button"
								className={styles.removeAnswerButton}
								onClick={() => handleRemoveAnswer(answerIndex)}
								title="Remove answer"
							>
								<X size={16} />
							</button>
						)}
					</div>
				))}
			</div>
			<button
				type="button"
				className={styles.addAnswerButton}
				onClick={handleAddAnswer}
			>
				<Plus size={16} />
				Add Answer Option
			</button>
		</div>
	);
}

export default MultiAnswersForm;
import { Check, X } from "lucide-react";
import styles from "./index.module.scss";
import { MultiAnswer } from "@/lib/types";

interface MultiAnswersProps {
	answers: MultiAnswer[] | undefined;
}

function MultiAnswers({ answers }: MultiAnswersProps) {
  if (!answers) return null;

	return (
		<div className={styles.answers}>
			{answers.map((answer, answerIndex) => (
				<div
					key={answerIndex}
					className={`${styles.answer} ${answer.isCorrect ? styles.correct : styles.incorrect}`}
				>
					<div
						className={`${styles.answerIndicator} ${answer.isCorrect ? styles.correct : styles.incorrect}`}
					>
						{answer.isCorrect ? <Check size={14} /> : <X size={14} />}
					</div>
					<span className={styles.answerText}>{answer.content}</span>
				</div>
			))}
		</div>
	)
}

export default MultiAnswers;
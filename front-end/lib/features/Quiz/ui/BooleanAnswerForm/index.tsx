import { Check, X } from "lucide-react";
import { QuestionType, type CreateQuestionBoolean } from "@/lib/types/quiz";
import { useQuestionForm } from "../../components/QuestionForm/QuestionFormContext";
import styles from "./index.module.scss";

function BooleanAnswerForm() {
	const { question, updateQuestion } = useQuestionForm();

	if (question.type !== QuestionType.BOOLEAN) {
		return null;
	}

	const setBooleanValue = (value: boolean) => {
		updateQuestion((prev) => ({
			...(prev as CreateQuestionBoolean),
			isCorrect: value,
		}));
	};

	return (
		<div className={styles.answersSection}>
			<label className={styles.answersLabel}>Correct Answer</label>
			<div className={styles.booleanOptions}>
				<button
					type="button"
					className={`${styles.booleanOption} ${question.isCorrect ? styles.active : ""}`}
					onClick={() => setBooleanValue(true)}
				>
					<Check size={18} />
					True
				</button>
				<button
					type="button"
					className={`${styles.booleanOption} ${!question.isCorrect ? styles.active : ""}`}
					onClick={() => setBooleanValue(false)}
				>
					<X size={18} />
					False
				</button>
			</div>
		</div>
	);
}

export default BooleanAnswerForm;
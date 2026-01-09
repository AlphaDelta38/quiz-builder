import { Check, X } from "lucide-react";
import styles from "./index.module.scss";
import { QuestionContentBoolean } from "@/lib/types";

interface BooleanAnswerProps {
	booleanContent: QuestionContentBoolean | undefined;
}

function BooleanAnswer({ booleanContent }: BooleanAnswerProps) {
	if (!booleanContent) return null;

	return (
		<div className={styles.booleanAnswers}>
			<div
				className={`${styles.booleanOption} ${booleanContent.isCorrect ? styles.correct : ""}`}
			>
				<span className={styles.booleanIcon}>
					<Check size={18} />
				</span>
				True
			</div>
			<div
				className={`${styles.booleanOption} ${!booleanContent.isCorrect ? styles.correct : ""}`}
			>
				<span className={styles.booleanIcon}>
					<X size={18} />
				</span>
				False
			</div>
		</div>
	);
}

export default BooleanAnswer;
import { CreateMultiAnswer } from "@/lib/types";
import styles from "./index.module.scss";
import { Check, Plus, X } from "lucide-react";

interface MultiAnswersFormProps {
	answers: CreateMultiAnswer[];
  handleMultiCorrectToggle: (answerIndex: number) => void;
  handleMultiAnswerChange: (answerIndex: number, content: string) => void;
  handleRemoveAnswer: (answerIndex: number) => void;
  handleAddAnswer: () => void;
}

function MultiAnswersForm({ 
  answers, 
  handleMultiCorrectToggle, 
  handleMultiAnswerChange, 
  handleRemoveAnswer,  
  handleAddAnswer,
}: MultiAnswersFormProps) {
	return (
		<div className={styles.answersSection}>
			<label className={styles.answersLabel}>Answer Options</label>
			<div className={styles.answers}>
				{answers.map((answer, answerIndex) => (
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
							placeholder={`Answer option ${answerIndex + 1}`}
						/>
						{answers.length > 2 && (
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
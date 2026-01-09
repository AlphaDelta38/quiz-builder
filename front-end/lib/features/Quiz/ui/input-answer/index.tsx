import styles from "./index.module.scss";

interface InputAnswerProps {
	placeholder?: string;
}

function InputAnswer({ placeholder }: InputAnswerProps) {
	return (
    <div className={styles.textAnswerPlaceholder}>
    <span className={styles.textAnswerLabel}>
      {placeholder ?? "Text answer required (no predefined answers)"}
    </span>
  </div>
	);
}

export default InputAnswer;

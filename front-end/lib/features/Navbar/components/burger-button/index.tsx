import styles from "./index.module.scss";

interface BurgerButtonProps {
  onClick: () => void;
  open: boolean;
}

function BurgerButton({ onClick, open }: BurgerButtonProps) {
  return (
    <button
      className={styles.burgerButton}
      onClick={onClick}
      aria-label="Menu"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={index}
          className={`${styles.burgerLine} ${open ? styles.open : ""}`}
        />
      ))
      }
    </button>
  );
}

export default BurgerButton;
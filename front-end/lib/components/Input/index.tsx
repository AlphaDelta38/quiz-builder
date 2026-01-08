"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import styles from "./Input.module.scss";



export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      fullWidth = false,
      leftIcon,
      rightIcon,
      type = "text",
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    const containerClassNames = [
      styles.container,
      fullWidth ? styles.fullWidth : "",
      className,
    ].filter(Boolean).join(" ");

    const inputWrapperClassNames = [
      styles.inputWrapper,
      error ? styles.hasError : "",
      leftIcon ? styles.hasLeftIcon : "",
      rightIcon || isPassword ? styles.hasRightIcon : "",
    ].filter(Boolean).join(" ");

    return (
      <div className={containerClassNames}>
        {label && (
          <label className={styles.label}>
            {label}
          </label>
        )}
        <div className={inputWrapperClassNames}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            ref={ref}
            type={isPassword && showPassword ? "text" : type}
            className={styles.input}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeClosed width={20} height={20} />
              ) : (
                <Eye width={20} height={20} />
              )}
            </button>
          )}
          {rightIcon && !isPassword && (
            <span className={styles.rightIcon}>{rightIcon}</span>
          )}
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";


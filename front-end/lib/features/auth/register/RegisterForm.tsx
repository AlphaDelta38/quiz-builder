"use client";

import { useState } from "react";
import { Input, Button } from "@/lib/components";
import { AuthCard } from "@/lib/features/Auth/components/AuthCard";
import styles from "./RegisterForm.module.scss";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const [apiError, setApiError] = useState<string | null>(null);
  const { register: authRegister } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setApiError(null);

    try {
      await authRegister({
        username: values.username,
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Failed to register. Please try again."
      );
    }
  });

  return (
    <AuthCard
      title="Create an account"
      subtitle="Register to start creating quizzes"
    >
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          label="Name"
          {...register("username")}
          type="text"
          placeholder="Your name"
          error={errors.username?.message}
          fullWidth
        />

        <Input
          label="Email"
          type="email"
          placeholder="example@email.com"
          error={errors.email?.message}
          {...register("email")}
          fullWidth
        />

        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register("password")}
          fullWidth
        />

        <Input
          label="Confirm password"
          type="password"
          placeholder="Repeat password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          fullWidth
        />

        {apiError && <div className={styles.errorBanner}>{apiError}</div>}

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          size="lg"
        >
          Register
        </Button>

      </form>
    </AuthCard>
  );
}

export default RegisterForm;

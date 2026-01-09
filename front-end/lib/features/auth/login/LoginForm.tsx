"use client";

import { useState } from "react";
import { AuthCard } from "@/lib/features/Auth/components/AuthCard";
import styles from "./LoginForm.module.scss";
import { Input, Button } from "@/lib/components";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const [apiError, setApiError] = useState<string | null>(null);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setApiError(null);

    try {
      await login(values);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Failed to sign in. Please try again."
      );
    }
  });

  return (
    <AuthCard
      title="Sing In"
      subtitle="Enter your email and password to sign in"
    >
      <form onSubmit={onSubmit} className={styles.form}>
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
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
          fullWidth
        />

        {apiError && <div className={styles.errorBanner}>{apiError}</div>}

        <Button type="submit" fullWidth isLoading={isSubmitting} size="lg">
          Sing In
        </Button>

      </form>
    </AuthCard>
  );
}

export default LoginForm;
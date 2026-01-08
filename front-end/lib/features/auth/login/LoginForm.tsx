"use client";

import { AuthCard } from "@/lib/features/auth/components/AuthCard";
import styles from "./LoginForm.module.scss";
import { Input, Button } from "@/lib/components";

function LoginForm() {

  return (
    <AuthCard
      title="Sing In"
      subtitle="Enter your email and password to sign in"
    >
      <form onSubmit={()=>{}} className={styles.form}>
        <Input
          label="Email"
          type="email"
          placeholder="example@email.com"
          value={""}
          onChange={() => {}}
          error={""}
          fullWidth
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={""}
          onChange={() => {}}
          error={""}
          fullWidth
        />

        <Button type="submit" fullWidth isLoading={true} size="lg">
          Sing In
        </Button>

      </form>
    </AuthCard>
  );
}

export default LoginForm;
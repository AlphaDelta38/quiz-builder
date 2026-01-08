"use client";

import { Input, Button } from "@/lib/components";
import { AuthCard } from "@/lib/features/auth/components/AuthCard";
import styles from "./RegisterForm.module.scss";

function RegisterForm() {

  return (
    <AuthCard
      title="Create an account"
      subtitle="Register to start creating quizzes"
    >
      <form onSubmit={()=>{}} className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Your name"
          value={""}
          onChange={() => {}}
          error={""}
          fullWidth
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="example@email.com"
          value={""}
          onChange={() => {}}
          error={""}
          fullWidth
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="At least 6 characters"
          value={""}
          onChange={() => {}}
          error={""}
          fullWidth
        />

        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Repeat password"
          value={""}
          onChange={() => {}}
          error={""}
          fullWidth
        />

        <Button type="submit" fullWidth isLoading={true} size="lg">
          Register
        </Button>
        
      </form>
    </AuthCard>
  );
}

export default RegisterForm;

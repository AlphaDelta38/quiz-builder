"use client";

import { RequireAuth } from "@/lib/features/Auth/components/RequireAuth";
import { MyQuizzes } from "@/lib/features/Quiz/widgets/MyQuizzes/MyQuizzes";

export default function MyQuizzesPage() {
  return (
    <RequireAuth>
      <MyQuizzes />
    </RequireAuth>
  );
}


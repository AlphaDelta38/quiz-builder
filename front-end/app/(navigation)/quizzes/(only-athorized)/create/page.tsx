import { RequireAuth } from "@/lib/features/Auth/components/RequireAuth";
import { CreateQuiz } from "@/lib/features/Quiz/widgets/CreateQuiz";

export default function CreateQuizPage() {
  return (
    <RequireAuth>
      <CreateQuiz />
    </RequireAuth>
  );
}

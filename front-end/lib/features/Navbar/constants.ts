import { AuthRoutes, Routes } from "@/app/routes";

const NavLinks = [
  { href: Routes.Home, label: "Home" },
  { href: Routes.Quizzes, label: "Quizzes" },
];

const AuthNavLinks = [
  { href: AuthRoutes.QuizzesCreate, label: "Create quiz" },
  { href: AuthRoutes.MyQuizzes, label: "My quizzes" },
];

export { NavLinks, AuthNavLinks };

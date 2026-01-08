import { AuthRoutes, Routes } from "@/app/routes";

const NavLinks = [
  { href: Routes.Home, label: "Home" },
  { href: Routes.Quizzes, label: "Quizzes" },
  { href: AuthRoutes.QuizzesCreate, label: "Create quiz" },
];

export { NavLinks };

import { NextResponse, type NextRequest } from "next/server";

const protectedPaths = ["/quizzes/create", "/quizzes/my"];
const guestOnlyPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isGuestOnly = guestOnlyPaths.some((path) => pathname.startsWith(path));

  // If protected and no token -> redirect to login
  if (isProtected && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If guest-only and already authenticated -> redirect home
  if (isGuestOnly && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/quizzes/create", "/quizzes/my", "/login", "/register"],
};


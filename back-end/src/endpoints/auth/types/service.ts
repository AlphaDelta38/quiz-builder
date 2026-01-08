
type LoginRequest = {
  email: string;
  password: string;
}

type RegisterRequest = {
  username: string;
  email: string;
  password: string;
}

export type { LoginRequest, RegisterRequest };
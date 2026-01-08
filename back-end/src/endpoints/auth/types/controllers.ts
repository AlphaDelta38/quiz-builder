import { LoginRequest, RegisterRequest } from "./service.js";
import { Request } from "express";

type LoginControllerRequest = Request<{}, {}, LoginRequest>;
type RegisterControllerRequest = Request<{}, {}, RegisterRequest>;
type RefreshControllerRequest = Request & { cookies: { refreshToken: string } };

export type { 
  LoginControllerRequest, 
  RegisterControllerRequest,
  RefreshControllerRequest
};

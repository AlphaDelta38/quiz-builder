import { Request } from "express";
import { CreateQuizzeServiceRequest } from "./services.js";

type CreateQuizzeControllerRequest = Request<{}, {}, CreateQuizzeServiceRequest>;
type GetQuizControllerRequest = Request<{ id: string }>;
type GetAllQuizzesControllerRequest = Request<{}, {}, {}, { page: string, limit: string }>;

export type {
  CreateQuizzeControllerRequest,
  GetQuizControllerRequest,
  GetAllQuizzesControllerRequest,
}

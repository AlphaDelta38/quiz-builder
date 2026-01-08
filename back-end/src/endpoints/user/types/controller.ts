
type MeControllerRequest = Request & { cookies: { accessToken: string } };
  type GetMyQuizzesControllerRequest = Request & { limit: number, page: number };

export type { 
  MeControllerRequest,
  GetMyQuizzesControllerRequest,
};

import { UserType } from "./models.js";

type UserAuthType = Omit<UserType, 'password' | 'createdAt' | 'updatedAt'> ;

export type { UserAuthType };
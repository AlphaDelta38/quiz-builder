import { UserAttibutes } from "./models.js";

type UserAuthType = Omit<UserAttibutes, 'password' | 'createdAt' | 'updatedAt'> ;

export type { UserAuthType };
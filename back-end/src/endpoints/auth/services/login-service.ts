import { UserType } from "../../../lib/types/models.js";
import { LoginRequest } from "../types/service.js";
import bcrypt from 'bcrypt';
import User from "../../../models/User.js";
import { CustomError } from "../../../lib/utils/error-handler.js";

async function loginService(data: LoginRequest): Promise<UserType> {
  const user = await User.findOne({ where: { email: data.email } });

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new CustomError('Invalid password', 401);
  }

  return user;
}

export default loginService;

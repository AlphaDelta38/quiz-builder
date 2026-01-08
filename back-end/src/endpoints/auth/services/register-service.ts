import { UserType } from "../../../lib/types/models.js";
import { RegisterRequest } from "../types/service.js";
import bcrypt from 'bcrypt';
import User from "../../../models/User.js";
import { CustomError } from "../../../lib/utils/error-handler.js";
import 'dotenv/config';

async function registerService(data: RegisterRequest): Promise<UserType> {
  const user = await User.findOne({ where: { email: data.email } });

  if (user) {
    throw new CustomError('User already exists', 400);
  }
  const hashedPassword = await bcrypt.hash(data.password, Number(process.env.BCRYPT_SALT ) || 5);

  const newUser = await User.create({ username: data.username, email: data.email, password: hashedPassword });

  return newUser;
}

export default registerService;

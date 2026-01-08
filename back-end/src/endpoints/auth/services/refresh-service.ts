import { UserAttibutes } from "../../../lib/types/models.js";
import User from "../../../models/User.js";
import { CustomError } from "../../../lib/utils/error-handler.js";
import 'dotenv/config';
import { verifyToken } from "../../../lib/utils/jwt.js";

async function refreshService(token: string): Promise<Omit<UserAttibutes, 'password'>> {
  const decoded = verifyToken<{ id: string }>(token);

  if (!decoded) {
    throw new CustomError('Invalid refresh token', 401);
  }
  const user = await User.findByPk(Number(decoded.id));

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  return user;
}

export default refreshService;

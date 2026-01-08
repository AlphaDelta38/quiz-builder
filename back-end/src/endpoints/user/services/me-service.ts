import { UserAttibutes } from "../../../lib/types/models.js";
import { CustomError } from "../../../lib/utils/error-handler.js";
import { verifyToken } from "../../../lib/utils/jwt.js";

async function meService(accessToken: string): Promise<Omit<UserAttibutes, 'password'>> {
  const decoded = verifyToken<Omit<UserAttibutes, 'password'>>(accessToken);

  if (!decoded) {
    throw new CustomError('Invalid access token', 401);
  }

  return decoded;
}

export default meService;

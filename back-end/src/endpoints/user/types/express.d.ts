import { JwtPayload } from 'jsonwebtoken';
import { UserType } from '../../../lib/types/models.ts';
import { UserAuthType } from '../../../lib/types/auth.js';


declare global {
  namespace Express {
    interface Request {
      user?: UserAuthType;
    }
  }
}

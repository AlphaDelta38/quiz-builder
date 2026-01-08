import { Router } from 'express';
import loginController from './controllers/login-controller.js';
import registerController from './controllers/register-controller.js';
import refreshController from './controllers/refresh-controller.js';
import validateMiddleware from '../../lib/middlewares/validate-middleware.js';
import registerSchema from './schemas/register.js';
import loginSchema from './schemas/login.js';

const router = Router();

router.post('/login', validateMiddleware(loginSchema), loginController);
router.post('/register', validateMiddleware(registerSchema), registerController);
router.post('/refresh', refreshController);

export default router;

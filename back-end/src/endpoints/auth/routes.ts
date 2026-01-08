import { Router } from 'express';
import loginController from './controllers/login-controller.js';
import registerController from './controllers/register-controller.js';
import refreshController from './controllers/refresh-controller.js';

const router = Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/refresh', refreshController);

export default router;

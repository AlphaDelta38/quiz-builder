import { Router } from 'express';
import meController from './controllers/me-controller.js';
import authMiddleware from '../../lib/middlewares/auth-middleware.js';

const router = Router();

router.get('/me', authMiddleware, meController);

export default router;

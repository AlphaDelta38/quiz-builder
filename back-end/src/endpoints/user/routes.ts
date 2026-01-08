import { Router } from 'express';
import meController from './controllers/me-controller.js';
import authMiddleware from '../../lib/middlewares/auth-middleware.js';
import getMyQuizzesController from './controllers/my-quizzes-controller.js';
import deleteQuizController from './controllers/delete-quiz-controller.js';

const router = Router();

router.get('/me', authMiddleware, meController);
router.get('/my-quizzes', authMiddleware, getMyQuizzesController);
router.delete('/my-quizzes/:id', authMiddleware, deleteQuizController);

export default router;

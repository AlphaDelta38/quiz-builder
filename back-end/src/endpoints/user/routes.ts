import { Router } from 'express';
import meController from './controllers/me-controller.js';
import authMiddleware from '../../lib/middlewares/auth-middleware.js';
import getMyQuizzesController from './controllers/my-quizzes-controller.js';
import deleteQuizController from './controllers/delete-quiz-controller.js';
import validateMiddleware from '../../lib/middlewares/validate-middleware.js';
import myQuizzesSchema from './schemas/my-quizzes.js';
import deleteQuizSchema from './schemas/delete-quiz.js';

const router = Router();

router.get('/me', authMiddleware, meController);
router.get('/my-quizzes', authMiddleware, validateMiddleware(myQuizzesSchema), getMyQuizzesController);
router.delete('/my-quizzes/:id', authMiddleware, validateMiddleware(deleteQuizSchema), deleteQuizController);

export default router;

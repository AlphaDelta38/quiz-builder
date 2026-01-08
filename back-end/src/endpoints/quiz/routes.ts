
import { Router } from 'express';
import createQuizController from './controllers/create-quiz-controller.js';
import getQuizController from './controllers/get-quiz-controller.js';
import authMiddleware from '../../lib/middlewares/auth-middleware.js';
import getAllQuizzesController from './controllers/get-all-quizzes-controller.js';


const router = Router();

router.post('/', authMiddleware, createQuizController);
router.get('/', getAllQuizzesController);
router.get('/:id', authMiddleware, getQuizController);


export default router;


import { Router } from 'express';
import createQuizController from './controllers/create-quiz-controller.js';
import getQuizController from './controllers/get-quiz-controller.js';
import authMiddleware from '../../lib/middlewares/auth-middleware.js';
import getAllQuizzesController from './controllers/get-all-quizzes-controller.js';
import validateMiddleware from '../../lib/middlewares/validate-middleware.js';
import getAllQuizzesSchema from './schemas/get-all.js';
import createQuizSchema from './schemas/create.js';
import getQuizSchema from './schemas/get-one.js';

const router = Router();

router.post('/', authMiddleware, validateMiddleware(createQuizSchema), createQuizController);
router.get('/', validateMiddleware(getAllQuizzesSchema), getAllQuizzesController);
router.get('/:id', authMiddleware, validateMiddleware(getQuizSchema), getQuizController);


export default router;

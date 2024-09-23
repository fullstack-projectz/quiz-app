/**
 * Here we define the all routes and
 * send back to the cilent
 *
 * @author meganathan
 */

import Router from 'express';
import {
  createQuiz,
  fetchQuestionsByQuizId,
} from '../controllers/quizController';

const router = Router();

// Here we define the method get or post
router.post('/create', createQuiz);
router.get('/:quizId', fetchQuestionsByQuizId);

export default router;

/**
 * Here the all question routs to be
 * map and return the obj to the cilent
 *
 * @author meganathan
 */

import { Router } from 'express';

import {
  createQuestion,
  deleteQuestionById,
  getAllQuestions,
  getQuestionByQuizId,
  updateQuestionById,
} from '../controllers/questionController';

const router = Router();

//Below the code get or post method defined
router.post('/create', createQuestion);
router.get('/getAllQuestions', getAllQuestions);
router.get('/:quizId', getQuestionByQuizId);
router.post('/update/:id', updateQuestionById);
router.delete('/delete/:id', deleteQuestionById);

export default router;

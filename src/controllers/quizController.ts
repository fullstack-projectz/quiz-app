/**
 * Here the file controller get
 *  the cilent req and process it
 * and return back to the cilent
 * response as json
 *
 * @author meganathan
 */

import { Request, Response } from 'express';
import {
  createQuizService,
  retrieveQuestionsForQuizService,
} from '../services/quizService';
import { sendResponse } from '../ResponseHandler/responseHandler';

// Create a quiz
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = req.body;

    // Send to the service layer
    const newQuiz = await createQuizService(quiz);

    return sendResponse(res, {
      message: 'Quiz is created',
      status: 201,
      data: newQuiz,
    });
  } catch (error) {
    console.error('Error occured in controller', error);
    return sendResponse(res, {
      message: 'Error while creating Quiz',
      status: 500,
      data: [],
    });
  }
};

// Code for get the quiz by id

export const fetchQuestionsByQuizId = async (req: Request, res: Response) => {
  try {
    // Get the id from the params
    const quizId = parseInt(req.params.quizId, 10);

    // check the validation
    if (isNaN(quizId)) {
      return sendResponse(res, {
        message: 'Give id is not valid',
        status: 400,
        data: [],
      });
    }

    // Send to the controller
    const result = await retrieveQuestionsForQuizService(quizId);

    return sendResponse(res, {
      message: 'quiz Retrive SuceessFully',
      status: 200,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return sendResponse(res, {
      message: 'Error occured while retriving',
      status: 500,
      data: [],
    });
  }
};

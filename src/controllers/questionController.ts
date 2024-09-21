/**
 * Here the controller file you should
 * send back to the cilent json format
 * and data and status code also send the
 * data to the server
 *
 * @author meganathan
 *
 */

import { Request, Response } from 'express';
import { createQuestionService } from '../services/questionSerivce';
import { ValidationError } from '../ValidationMessage/ValidationError';

// Create a new question
export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = req.body;

    if (!question.content || !question.options || !question.correct_answer) {
      return res.status(400).json({
        status: 400,
        message: 'Missing required fields: content, options, or correct_answer',
      });
    }

    // send to the userservice
    const createdQuestion = await createQuestionService(question);

    return createdQuestion;
  } catch (error: any) {
    console.error(error);
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

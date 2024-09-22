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
import {
  createQuestionService,
  deleteQuesionByIdService,
  getAllQuestionService,
  getQuestionsByQuizIdService,
  updateQuestionByIdService,
} from '../services/questionSerivce';
import { ValidationError } from '../ValidationMessage/ValidationError';
import { sendResponse } from '../ResponseHandler/responseHandler';

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

    return sendResponse(res, {
      message: 'Question is Created',
      status: 201,
      data: createdQuestion,
    });
  } catch (error: any) {
    console.error(error);
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Below the code for list all question
export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const result = await getAllQuestionService();

    return sendResponse(res, {
      message: 'Data Retrived SuccessFully',
      data: result,
      status: 200,
    });
  } catch (error) {
    console.error('Error While fetching', error);
    return sendResponse(res, {
      message: 'Error while fetching Data',
      data: [],
      status: 500,
    });
  }
};

// Below the code for get the question from quiz id
export const getQuestionByQuizId = async (req: Request, res: Response) => {
  try {
    const quizId = parseInt(req.params.quizId, 10);
    console.log(quizId);

    const result = await getQuestionsByQuizIdService(quizId);

    return sendResponse(res, {
      message: 'Data Retrived SucessFully',
      status: 200,
      data: result,
    });
  } catch (error) {
    console.error('Error Occured in Controller', error);
    return sendResponse(res, {
      message: `Error while fetching the data`,
      status: 500,
      data: [],
    });
  }
};

// below the code update the quiz
export const updateQuestionById = async (req: Request, res: Response) => {
  try {
    const question = req.body;
    const id = parseInt(req.params.id, 10);
    const quizId = parseInt(req.body.quiz_id, 10);

    if (isNaN(id) || isNaN(quizId)) {
      return sendResponse(res, {
        message: 'Given id is invalid',
        status: 400,
        data: [],
      });
    }

    const result = await updateQuestionByIdService(id, question);
    return sendResponse(res, {
      message: 'Data Update SuccessFully',
      status: 200,
      data: result,
    });
  } catch (error) {
    console.error('Error while updating the data controller', error);

    return sendResponse(res, {
      message: 'Error while updating the DATA',
      status: 500,
      data: [],
    });
  }
};

// Here the code for delete the question

export const deleteQuestionById = async (req: Request, res: Response) => {
  try {
    // need to check the validation
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return sendResponse(res, {
        message: 'Given id is invalid',
        status: 400,
        data: [],
      });
    }

    // send to the service
    if (await deleteQuesionByIdService(id)) {
      return sendResponse(res, {
        message: 'Data is Deleted SuccessFully',
        status: 200,
        data: [],
      });
    }
  } catch (error) {
    console.error('Error in Controller', error);

    return sendResponse(res, {
      message: 'Error Occured',
      status: 500,
      data: [],
    });
  }
};

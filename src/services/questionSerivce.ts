/**
 * Here the file all service business logic
 * will be there
 *
 * @author meganathan
 */

import {
  createQuestionDAO,
  deleteQuestionByIdDAO,
  getAllQuestionDAO,
  getQuestionsByQuizIdDAO,
  updateQuestionByIdDAO,
} from '../dao/questionDAO';
import { Question } from '../models/Question';
import { ValidationError } from '../ValidationMessage/ValidationError';

// Create a new question
export const createQuestionService = async (
  question: Question
): Promise<Question> => {
  // Need to check the validation
  if (!question.content || !question.options || !question.correct_answer) {
    throw new ValidationError(
      'Missing required fields: username, email, or password'
    );
  }

  try {
    const newQuestion = await createQuestionDAO(question);

    return newQuestion;
  } catch (error) {
    console.error(error);
    throw new Error('Database error');
  }
};

// below the code for get all the question
export const getAllQuestionService = async (): Promise<Question[]> => {
  try {
    const result = await getAllQuestionDAO();

    return result;
  } catch (error) {
    console.error('error occured in service', error);
    throw error;
  }
};

// get the question by quiz id

export const getQuestionsByQuizIdService = async (
  quizId: number
): Promise<Question[]> => {
  // need to check the validation
  if (isNaN(quizId)) {
    throw new ValidationError('Given Id id not Valid');
  }
  try {
    const result = await getQuestionsByQuizIdDAO(quizId);

    return result;
  } catch (error) {
    console.error('error occured in Service', error);
    throw error;
  }
};

// Update the question by id

export const updateQuestionByIdService = async (
  id: number,
  question: Question
): Promise<Question | null> => {
  try {
    // Send  id the DAO

    const result = await updateQuestionByIdDAO(id, question);
    return result;
  } catch (error) {
    console.error('Error occured in Service', error);
    throw error;
  }
};

// Create a delete question by id

export const deleteQuesionByIdService = async (
  id: number
): Promise<boolean> => {
  try {
    const result = await deleteQuestionByIdDAO(id);
    return result;
  } catch (error) {
    console.error('error occured in service', error);
    throw error;
  }
};

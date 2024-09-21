/**
 * Here the file all service business logic
 * will be there
 *
 * @author meganathan
 */

import { createQuestionDAO } from '../dao/questionDAO';
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

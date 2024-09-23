/**
 * This file represent the service layer
 * get the cilent req and check the validation
 * and send to DAO like this file only intract with
 * controller and validation
 *
 * @author meganathan
 */

import { Quiz } from '../models/Quiz';
import { createQuizDAO, retrieveQuestionsForQuizDAO } from '../dao/quizDAO';

// create a new quiz
export const createQuizService = async (quiz: Quiz): Promise<Quiz> => {
  try {
    // need to check the validation
    if (!quiz.title || !quiz.description || !quiz.user_id) {
      throw new Error('All Fields are mandatory');
    }

    // Send the Dao Layer
    const result = await createQuizDAO(quiz);

    return result;
  } catch (error) {
    console.error('Error Occured in Service', error);
    throw error;
  }
};

// Below the code retrive the question from the db
export const retrieveQuestionsForQuizService = async (
  id: number
): Promise<Quiz | null> => {
  try {
    // send the id to the dao layer
    const result = await retrieveQuestionsForQuizDAO(id);

    return result;
  } catch (error) {
    console.error('error occured in Service', error);
    throw error;
  }
};

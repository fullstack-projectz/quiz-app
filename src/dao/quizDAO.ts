/**
 * Here the file DAO layer intract with
 * the db and return the results to the
 * service
 *
 * @author meganathan
 */

import { ResultSetHeader } from 'mysql2';
import pool from '../config/Database';
import { Quiz } from '../models/Quiz';

// create a new quiz
export const createQuizDAO = async (quiz: Quiz): Promise<Quiz> => {
  try {
    const [result]: [ResultSetHeader, any] = await pool.execute(
      'INSERT INTO quizzes (title,description,user_id) VALUES (?,?,?)',
      [quiz.title, quiz.description, quiz.user_id]
    );

    console.log(result.insertId);

    return {
      id: result.insertId,
      ...quiz,
    };
  } catch (error) {
    console.error('error occured in DB', error);
    throw error;
  }
};

// Retrieve the questions based on quiz ID from the question table
export const retrieveQuestionsForQuizDAO = async (
  quizId: number
): Promise<Quiz | null> => {
  try {
    const [result]: any = await pool.execute(
      `SELECT q.title, q.description, que.id AS question_id, que.content, que.options 
             FROM quizzes q 
             JOIN questions que ON q.id = que.quiz_id 
             WHERE q.id = ?`,
      [quizId]
    );

    if (result.length > 0) {
      const quizDetails: Quiz = {
        id: quizId,
        title: result[0].title,
        description: result[0].description,

        questions: result.map((row: any) => ({
          question_id: row.question_id,
          content: row.content,
          options: row.options,
        })),
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
      console.log(quizDetails.questions);

      console.log('Quiz with questions retrieved:', quizDetails);
      return quizDetails;
    } else {
      console.log('Quiz not found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving quiz with questions:', error);
    throw error;
  }
};

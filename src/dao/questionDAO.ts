/**
 * Here the DAO file access the database
 * and return the obj to the cilent
 *
 * @author meganathan
 */

import pool from '../config/Database';
import { Question } from '../models/Question';

// Create a new user
export const createQuestionDAO = async (
  question: Question
): Promise<Question> => {
  try {
    const result = await pool.execute(
      `INSERT INTO question (content, options, correct_answer,quiz_id`,
      [
        question.content,
        JSON.stringify(question.options),
        question.correct_answer,
        question.quiz_id,
      ]
    );

    console.log(result);

    return {
      ...question, // spread operator will sperate the id and quiz_id
      id: (result as any).insertId,
    };
  } catch (error) {
    console.error('Error inserting question into DB:', error);
    throw error;
  }
};

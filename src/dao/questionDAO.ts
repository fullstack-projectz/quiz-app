/**
 * Here the DAO file access the database
 * and return the obj to the cilent
 *
 * @author meganathan
 */

import { ResultSetHeader } from 'mysql2';
import pool from '../config/Database';
import { Question } from '../models/Question';

// Create a new user
export const createQuestionDAO = async (
  question: Question
): Promise<Question> => {
  try {
    // TODO: need to understand
    const result = await pool.execute(
      `INSERT INTO questions (content, options, correct_answer, quiz_id) VALUES (?,?,?,?)`,
      [
        question.content,
        question.options,
        question.correct_answer,
        question.quiz_id,
      ]
    );

    console.log(result);
    // const id = (result as any).insertId

    return {
      ...question, // spread operator will sperate the id and quiz_id
    };
  } catch (error) {
    console.error('Error inserting question into DB:', error);
    throw error;
  }
};

// Get the all question from the DB
export const getAllQuestionDAO = async (): Promise<Question[]> => {
  // promise return as the array

  try {
    const [rows] = await pool.execute('SELECT * FROM questions');

    const quesions: Question[] = rows as Question[];

    return quesions;
  } catch (error) {
    console.error('Error while fetching question', error);
    throw error;
  }
};

// Get the questions by quiz id
export const getQuestionsByQuizIdDAO = async (
  quizId: number
): Promise<Question[]> => {
  try {
    // Write the query
    const [rows] = await pool.execute(
      'SELECT * FROM questions WHERE quiz_id = ?',
      [quizId]
    );

    const questions = rows as Question[];

    return questions;
  } catch (error) {
    console.error('Error occured in DB', error);
    throw error;
  }
};

// Update the question by id
export const updateQuestionByIdDAO = async (
  id: number,
  question: Partial<Question>
): Promise<Question | null> => {
  try {
    const fields: string[] = [];
    const values: any[] = [];

    if (question.content) {
      fields.push('content = ?');
      values.push(question.content);
    }

    if (question.correct_answer) {
      fields.push('correct_answer = ?');
      values.push(question.correct_answer);
    }

    if (question.options) {
      if (typeof question.options === 'object') {
        values.push(question.options);
        fields.push('options = ?');
      }
    }

    if (question.quiz_id) {
      fields.push('quiz_id = ?');
      values.push(question.quiz_id);
    }

    values.push(id);

    if (fields.length === 0) {
      console.error('No fields provided for update');
      return null;
    }

    const query = `UPDATE questions SET ${fields.join(', ')} WHERE id = ?`;

    const [result]: [ResultSetHeader, any] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
      // console.log("No rows updated, possibly the same data.");
      return null; // No rows updated
    }

    const [rows] = await pool.execute('SELECT * FROM questions WHERE id = ?', [
      id,
    ]);
    // console.log("Fetched rows:", rows);
    const updatedQuestion = (rows as any)[0];

    if (!updatedQuestion) {
      // console.log("Question not found after update");
      return null; // Question not found
    }

    return {
      id: updatedQuestion.id,
      content: updatedQuestion.content || '',
      correct_answer: updatedQuestion.correct_answer || '',
      options: updatedQuestion.options,
      quiz_id: updatedQuestion.quiz_id || 0,
    };
  } catch (error) {
    console.error('Error occurred in DB:', error);
    throw error; // Rethrow the error for higher-level handling
  }
};

// Below the code for delete
export const deleteQuestionByIdDAO = async (id: number): Promise<boolean> => {
  try {
    // Write the db query
    const [result]: [ResultSetHeader, any] = await pool.execute(
      'DELETE FROM questions WHERE id = ?',
      [id]
    );

    const affectedRows = result.affectedRows;

    return affectedRows > 0;
  } catch (error) {
    console.error('Error in Db', error);
    throw error;
  }
};

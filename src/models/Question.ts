/**
 * Here the folder the quiz model
 * will be there
 */

export interface Question {
  id?: number; // Optional for new questions
  content: string;
  options: [];
  correct_answer: string;
  quiz_id: number;
}

/**
 * Here the folder the quiz model
 * will be there
 */

export interface Question {
  id?: number; // Optional for new questions
  content: string;
  options: string[]; // This should match your JSON type in SQL
  correct_answer: string;
  quiz_id: number;
}

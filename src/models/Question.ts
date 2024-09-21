/**
 * Here the folder the quiz model
 * will be there
 */

export interface Quiz {
  id?: number;
  content: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

/**
 * Here is the model to represent the quizzes DB.
 *
 * @author Meganathan
 */
export interface Quiz {
  id?: number;
  title: string;
  description: string;
  questions?: {
    question_id: number;
    content: string;
    options: any[];
  }[];
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

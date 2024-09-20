/**
 * Here the file for the
 * users model
 *
 * @author meganathan
 *
 */
export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  // phonenumber?: number,
  // address?: string,
  created_at?: Date;
  updated_at?: Date;
}

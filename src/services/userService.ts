/**
 * Here the all service layer will be
 * there like business logics
 *
 * @author meganathan
 */
import { User } from '../models/User';
import pool from '../config/Database';
import bcrypt from 'bcrypt';

export const createUser = async (user: User): Promise<User> => {
  // Hash the password in db
  const hashedPassword = await bcrypt.hash(user.password, 10);
  // excute the query
  const [result] = await pool.execute(
    'INSERT INTO users (username,email,password) VALUES(?,?,?)',
    [user.username, user.email, hashedPassword]
  );
  console.log(result);
  const insertId = (result as any).insertId;

  return { id: insertId, ...user, password: hashedPassword };
};

/**
 * Here the all service layer will be
 * there like business logics
 *
 * @author meganathan
 */
import { User } from '../models/User';
import pool from '../config/Database';
import bcrypt from 'bcrypt';

// Create a new user
export const createUserService = async (user: User): Promise<User> => {
  console.log('User data:', user);

  if (!user.username || !user.email || !user.password) {
    throw new Error('Missing required fields: username, email, or password');
  }
  // Hash the password in db
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // excute the query
  const result = await pool.execute(
    'INSERT INTO users (username,email,password) VALUES(?, ?, ?)',
    [user.username, user.email, hashedPassword]
  );
  console.log(result);
  const insertId = (result as any).insertId;

  return { id: insertId, ...user, password: hashedPassword }; // ...spread operater will be overwrite the password
};

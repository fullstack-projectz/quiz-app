/**
 * Here the Data Access obj will
 * intract with the Data base and return the
 * data
 *
 * @author meganathan
 */

import { User } from '../models/User';
import pool from '../config/Database';
import bcrypt from 'bcrypt';
// import { ResultSetHeader } from "mysql2";

// Create new user
export const createUserDAO = async (user: User): Promise<User> => {
  console.log('User data:', user);

  // Hash the password in db
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // excute the query
  const result = await pool.execute(
    'INSERT INTO users (username,email,password) VALUES(?, ?, ?)',
    [user.username, user.email, hashedPassword]
  );
  // console.log(result);
  const insertId = (result as any).insertId;

  return { id: insertId, ...user, password: hashedPassword }; // ...spread operater will be overwrite the password
};

// get the  user by their id
export const getUserByIdDAO = async (
  userId: number
): Promise<Omit<User, 'password'> | null> => {
  try {
    const [rows] = await pool.execute(
      'SELECT id,username,email FROM users WHERE id = ?',
      [userId]
    );
    const users = rows as Omit<User, 'password'>[];
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error('error while retriving the data', error);
    throw error;
  }
};

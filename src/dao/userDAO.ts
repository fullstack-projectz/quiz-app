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
import { ResultSetHeader } from 'mysql2';

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

// Update the user
export const updateUserDAO = async (
  id: number,
  user: Partial<User>
): Promise<Omit<User, 'password'> | null> => {
  try {
    // update the password
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    // build dynmaic query based on provided fiedls
    const fields: string[] = [];
    const values: any[] = [];

    if (user.username) {
      fields.push('username = ?');
      values.push(user.username);
    }

    if (user.email) {
      fields.push('email = ?');
      values.push(user.email);
    }

    if (user.password) {
      fields.push('password = ?');
      values.push(user.password);
    }

    if (fields.length === 0) {
      throw new Error('No Fields to update');
    }

    // finally push the id
    values.push(id);

    console.log('values', values);
    console.log('fields', fields);

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

    const [result]: [ResultSetHeader, any] = await pool.execute(query, values);

    const affectedRows = result.affectedRows;
    // console.log(affectedRows); // RETURN 1
    if (affectedRows == 0) {
      return null;
    }

    // return the udpated user
    return {
      id,
      username: user.username || '',
      email: user.email || '',
    };
  } catch (error) {
    console.error('Error in updateUserService:', error);
    throw error;
  }
};

// Delete the user

export const deleteUserDAO = async (id: number): Promise<boolean> => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    const affectedRows = (result as any).affectedRows;

    return affectedRows > 0; // Check the affected rows and send the boolean
  } catch (error) {
    console.error('Error while deleting the record', error);
    throw error;
  }
};

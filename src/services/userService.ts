/**
 * Here the all service layer will be
 * there like business logics
 *
 * @author meganathan
 */
import { User } from '../models/User';
import pool from '../config/Database';
import bcrypt from 'bcrypt';
import { ResultSetHeader } from 'mysql2';
import { createUserDAO, getUserByIdDAO } from '../dao/userDAO';

// Create a new user
export const createUserService = async (user: User): Promise<User> => {
  console.log('User data:', user);

  if (!user.username || !user.email || !user.password) {
    throw new Error('Missing required fields: username, email, or password');
  }

  try {
    const newUser = await createUserDAO(user);

    console.log(newUser);

    // Return the new user
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error('Error happen In Service while crate a user');
  }
};
// Get a user by ID
export const getUserByIdService = async (
  userId: number
): Promise<Omit<User, 'password'> | null> => {
  // Check the validation
  if (isNaN(userId)) {
    throw new Error('Error Happen in Validation');
  }

  try {
    const userGetById = getUserByIdDAO(userId);

    return userGetById;
  } catch (error) {
    console.error('error while retriving the data', error);
    throw error;
  }
};

// now update the user
export const updateUserService = async (
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

// Here the code delete the users

export const deleteUserService = async (id: number): Promise<boolean> => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

    const affectedRows = (result as any).affectedRows;

    return affectedRows > 0;
  } catch (error) {
    console.error('Error while deleting the record', error);
    throw error;
  }
};

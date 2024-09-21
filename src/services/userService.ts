/**
 * Here the all service layer will be
 * there like business logics
 *
 * @author meganathan
 */
import { User } from '../models/User';
import {
  createUserDAO,
  deleteUserDAO,
  getUserByIdDAO,
  updateUserDAO,
} from '../dao/userDAO';

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
    const updatedUser = updateUserDAO(id, user);

    // Send back as the obj
    return updatedUser;
  } catch (error) {
    console.error('Error in updateUserService:', error);
    throw error;
  }
};

// Here the code delete the users

export const deleteUserService = async (id: number): Promise<boolean> => {
  try {
    const deletedUser = deleteUserDAO(id);

    return deletedUser;
  } catch (error) {
    console.error('Error while deleting the record', error);
    throw error;
  }
};

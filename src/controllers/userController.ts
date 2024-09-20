/**
 * Here the file user controller will be
 * there and get the req from the user
 * and return response to the user
 *
 * @author meganathan
 */
import { Request, Response } from 'express';
import { createUserService } from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // Input validation
    if (!user.username || !user.email || !user.password) {
      return res.status(400).json({
        status: 400,
        message: 'Missing required fields: username, email, or password',
      });
    }

    // Call the service to create the user
    const newUser = await createUserService(user);

    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while creating the user',
      error: error || 'Internal Server Error',
    });
  }
};

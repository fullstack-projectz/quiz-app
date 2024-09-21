/**
 * Here the file user controller will be
 * there and get the req from the user
 * and return response to the user
 *
 * @author meganathan
 */
import { Request, Response } from 'express';
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  updateUserService,
} from '../services/userService';

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

// Get the user by their id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: 'Required Field id',
      });
    }

    const user = await getUserByIdService(id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    // Return the user
    return res.status(200).json({
      status: 200,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error: any) {
    console.error('Error in getUserById controller:', error);
    return res.status(500).json({
      status: 500,
      message: 'An error occurred while retrieving the user',
      error: error.message || 'Internal Server Error',
    });
  }
};

// update the user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    // check the id first
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        messgae: 'give the proper id',
      });
    }

    const user = req.body;

    if (!user.username || !user.email || !user.password) {
      return res.status(400).json({
        status: 400,
        message: 'username, email , password is required',
      });
    }

    const updatedUser = await updateUserService(id, user);

    return res.status(200).json({
      status: 200,
      message: 'Data updated Successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('error while update the user detail', error);

    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

// code for delete the user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    // we should check the id
    const id = parseInt(req.body.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: 'Give the proper Id',
      });
    }

    // send the id to the service
    const deletedUser = await deleteUserService(id);

    if (deletedUser) {
      return res.status(200).json({
        status: 200,
        message: 'data deleted sucessfully',
      });
    }
  } catch (error) {
    console.error('error while deleting the user', error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

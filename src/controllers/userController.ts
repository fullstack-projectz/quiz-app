/**
 * Here the file user controller will be
 * there and get the req from the user
 * and return response to the user
 *
 * @author meganathan
 */

import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(200).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating quiz', error });
  }
};

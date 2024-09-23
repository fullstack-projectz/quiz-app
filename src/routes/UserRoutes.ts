/**
 * Here the file all routes would be
 * change to controller and model
 *
 * @author meganathan
 */

import { Router } from 'express';
import {
  createUser,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/userController';

const router = Router();

// Here the get or post method will be there
router.post('/create', createUser);
router.get('/:id', getUserById);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;

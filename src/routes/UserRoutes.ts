/**
 * Here the file all routes would be
 * change to controller and model
 *
 * @author meganathan
 */

import { Router } from 'express';
import { createUser } from '../controllers/userController';

const router = Router();

// Here the get or post method will be there
router.post('/create', createUser);

export default router;

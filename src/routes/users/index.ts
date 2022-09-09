import { Router } from 'express';

import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from '../../controllers/users';
import { validateAccessToken } from '../../functions/jwt';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.patch('/:id', validateAccessToken, updateUser);

export = router;

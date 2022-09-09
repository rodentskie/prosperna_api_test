import { Router } from 'express';

import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
} from '../../controllers/users';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

export = router;

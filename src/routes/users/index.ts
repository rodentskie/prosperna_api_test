import { Router } from 'express';

import { createUser, getUsers, getUser } from '../../controllers/users';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);

export = router;

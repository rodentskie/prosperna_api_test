import { Router } from 'express';

import { createProduct } from '../../controllers/products';
import { validateAccessToken } from '../../functions/jwt';

const router = Router();

router.post('/', validateAccessToken, createProduct);

export = router;

import { Router } from 'express';

import {
  createProduct,
  getProduct,
  getProducts,
} from '../../controllers/products';
import { validateAccessToken } from '../../functions/jwt';

const router = Router();

router.post('/', validateAccessToken, createProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);

export = router;

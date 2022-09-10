import { Router } from 'express';

import {
  createProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from '../../controllers/products';
import { validateAccessToken } from '../../functions/jwt';

const router = Router();

router.post('/', validateAccessToken, createProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);
router.delete('/:id', validateAccessToken, deleteProduct);
router.patch('/:id', validateAccessToken, updateProduct);

export = router;

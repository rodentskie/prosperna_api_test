import { Request, Response } from 'express';

import { ProductsModel } from '../../models/products';
import { Products } from '../../types/products';

import { badRequest, ok } from '../../functions/response';
import { makeLogger } from '../../functions/logger';

const logger = makeLogger('GetProducts');

export const getProducts = async (req: Request, res: Response) => {
  try {
    // populate userId to show user details
    const products: Products[] = await ProductsModel.find(
      {},
      {
        __v: 0,
      },
    ).populate({
      path: 'userId',
    });

    return ok(res, '', { products });
  } catch (e) {
    logger.error(e);
    return badRequest(res, 'Something went wrong, please try again.');
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // populate userId to show user details
    const product: Products | null = await ProductsModel.findById(id, {
      __v: 0,
    }).populate({
      path: 'userId',
    });

    return ok(res, 'OK', { product });
  } catch (e) {
    logger.error(e);
    return badRequest(res, "Product doesn't exist.");
  }
};

import { Request, Response } from 'express';

import { ProductsModel } from '../../models/products';

import { badRequest, created } from '../../functions/response';
import { makeLogger } from '../../functions/logger';
import { CreateProductInput } from '../../types/products';
import { JwtVerifyResult } from '../../types/users';

const logger = makeLogger('CreateProduct');

export const createProduct = async (req: Request, res: Response) => {
  try {
    const input = req.body as CreateProductInput;
    const user = req.headers.user as unknown;
    const { data } = user as JwtVerifyResult;

    const { id } = data; // id of logged in user

    const { product_name, product_description, product_price, product_tag } = input;

    if (!product_name || typeof product_name !== 'string') return badRequest(res, 'Invalid product name.');

    if (!product_description || typeof product_description !== 'string') return badRequest(res, 'Invalid product description.');

    if (!product_price || typeof product_price !== 'number') return badRequest(res, 'Invalid product price.');

    if (!Array.isArray(product_tag)) return badRequest(res, 'Invalid product tag.');

    // check if there are tags which are not string
    const checkTag = product_tag.some((data) => typeof data !== 'string');
    if (checkTag) return badRequest(res, 'Incorrect product tag input.');

    // case insensitive query
    const checkProduct = await ProductsModel.exists({
      name: { $regex: product_name, $options: 'i' },
    });
    if (checkProduct) return badRequest(res, 'Product already exist.');

    const productInput = {
      name: product_name,
      description: product_description,
      price: product_price,
      tag: product_tag,
      userId: id,
    };

    const product = await ProductsModel.create(productInput);

    return created(res, 'Product created successfully.', product);
  } catch (e) {
    logger.error(e);
    return badRequest(res, 'Product is not created.');
  }
};

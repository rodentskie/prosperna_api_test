import { Request, Response } from 'express';

import { ProductsModel } from '../../models/products';
import { JwtVerifyResult } from '../../types/users';
import { badRequest, noContent } from '../../functions/response';
import { makeLogger } from '../../functions/logger';
import { UpdateProductInput } from '../../types/products';

const logger = makeLogger('UpdateProduct');

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.headers.user as unknown;
    const { data } = user as JwtVerifyResult;
    const { id: loginUserId } = data; // id of logged in user

    const input = req.body as UpdateProductInput;

    const { product_name, product_description, product_price, product_tag } =
      input;

    if (!product_name || typeof product_name !== 'string')
      return badRequest(res, 'Invalid product name.');

    if (!product_description || typeof product_description !== 'string')
      return badRequest(res, 'Invalid product description.');

    if (!product_price || typeof product_price !== 'number')
      return badRequest(res, 'Invalid product price.');

    if (!Array.isArray(product_tag))
      return badRequest(res, 'Invalid product tag.');

    // check if there are tags which are not string
    const checkTag = product_tag.some((data) => typeof data !== 'string');
    if (checkTag) return badRequest(res, 'Incorrect product tag input.');

    // case insensitive query where ID not equal to ID param
    const checkProduct = await ProductsModel.exists({
      name: { $regex: product_name, $options: 'i' },
      _id: { $ne: id },
    });
    if (checkProduct) return badRequest(res, 'Product already exist.');

    const product = await ProductsModel.findOne({ _id: id });
    if (!product) return badRequest(res, "Product doesn't exist.");

    const { userId } = product;

    if (loginUserId !== userId)
      return badRequest(res, 'Not allowed to update.');

    const productInput = {
      name: product_name,
      description: product_description,
      price: product_price,
      tag: product_tag,
    };

    const result = await ProductsModel.findByIdAndUpdate(id, productInput);

    if (result) return noContent(res);
    return badRequest(res, "Product doesn't exist.");
  } catch (e) {
    logger.error(e);
    return badRequest(res, 'Error on delete, please check.');
  }
};

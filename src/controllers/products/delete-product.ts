import { Request, Response } from 'express';

import { ProductsModel } from '../../models/products';
import { JwtVerifyResult } from '../../types/users';
import { badRequest, noContent } from '../../functions/response';
import { makeLogger } from '../../functions/logger';

const logger = makeLogger('DeleteProduct');

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = req.headers.user as unknown;
    const { data } = user as JwtVerifyResult;
    const { id: loginUserId } = data; // id of logged in user

    const product = await ProductsModel.findOne({ _id: id });
    if (!product) return badRequest(res, "Product doesn't exist.");

    const { userId } = product;

    if (loginUserId !== userId) return badRequest(res, 'Not allowed to delete.');

    const result = await ProductsModel.findByIdAndDelete(id);
    if (result) return noContent(res);
    return badRequest(res, "Product doesn't exist.");
  } catch (e) {
    logger.error(e);
    return badRequest(res, 'Error on delete, please check.');
  }
};

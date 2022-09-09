import { Request, Response } from 'express';

import { UsersModel } from '../../models/user';

import { badRequest, noContent } from '../../functions/response';
import { makeLogger } from '../../functions/logger';

const logger = makeLogger('DeleteUsers');

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await UsersModel.findByIdAndDelete(id);

    if (result) return noContent(res);
    return badRequest(res, "User doesn't exist.");
  } catch (e) {
    logger.error(e);
    return badRequest(res, "User doesn't exist.");
  }
};

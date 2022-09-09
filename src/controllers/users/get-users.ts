import { Request, Response } from 'express';

import { UsersModel } from '../../models/user';
import { Users } from '../../types/users';

import { badRequest, ok } from '../../functions/response';
import { makeLogger } from '../../functions/logger';

const logger = makeLogger('GetUsers');

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: Users[] = await UsersModel.find(
      {},
      {
        __v: 0,
      },
    );

    return ok(res, '', { users });
  } catch (e) {
    logger.error(e);
    return badRequest(res, 'Something went wrong, please try again.');
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const users: Users | null = await UsersModel.findById(id, {
      __v: 0,
    });

    return ok(res, 'OK', { users });
  } catch (e) {
    logger.error(e);
    return badRequest(res, "User doesn't exist.");
  }
};

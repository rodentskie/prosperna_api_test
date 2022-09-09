import { Request, Response } from 'express';

import { UsersModel } from '../../models/user';
import { generateAccessToken } from '../../functions/jwt';
import { validateData } from '../../functions/encryption';
import { LoginInput } from '../../types/users';
import { makeLogger } from '../../functions/logger';
import { badRequest, ok } from '../../functions/response';

const logger = makeLogger('Login');

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body as LoginInput;

    const { email, password: passwordInput } = data;

    const user = await UsersModel.findOne({ email });
    if (!user) return badRequest(res, "User doesn't exist.");

    const { password, _id: id } = user;

    const checkPassword = await validateData(passwordInput, password);
    if (!checkPassword) return badRequest(res, 'Incorrect password.');

    const token = generateAccessToken({ id });

    return ok(res, 'Successfully login.', { token });
  } catch (e) {
    logger.error(e);
    return badRequest(res, 'Something went wrong, please try again.');
  }
};

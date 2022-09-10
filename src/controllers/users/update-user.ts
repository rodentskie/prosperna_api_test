import { Request, Response } from 'express';
import { validate } from 'email-validator';

import { badRequest, noContent } from '../../functions/response';
import { JwtVerifyResult, UpdateUserInput } from '../../types/users';
import { UsersModel } from '../../models/user';
import { makeLogger } from '../../functions/logger';
import { encrypt } from '../../functions/encryption';

const logger = makeLogger('UpdateUser');

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = req.headers.user as unknown;
    const { data } = user as JwtVerifyResult;

    const { id: loginUserId } = data;

    if (loginUserId !== id) return badRequest(res, 'Not allowed to update.');

    const input = req.body as UpdateUserInput;
    const { email, password, password_confirmation } = input;

    // validate email format
    if (!validate(email)) return badRequest(res, 'Invalid email.');
    if (password !== password_confirmation) {
      return badRequest(res, 'Password does not match.');
    }

    const checkEmail = await UsersModel.exists({ email, _id: { $ne: id } });
    if (checkEmail) return badRequest(res, 'Email already exist.');

    const userInput = {
      email,
      password: await encrypt(password),
    };

    const result = await UsersModel.findByIdAndUpdate(id, userInput);

    if (result) return noContent(res);
    return badRequest(res, "User doesn't exist.");
  } catch (e) {
    logger.error(e);
    return badRequest(res, 'User is not created.');
  }
};

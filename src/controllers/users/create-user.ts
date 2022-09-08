import { Request, Response } from 'express';
import { validate } from 'email-validator';

import { created, badRequest } from '../../functions/response';
import { generateId } from '../../functions/generate-id';
import { Entities } from '../../entity';
import { CreateUserInput } from '../../types/users';
import { UsersModel } from '../../models/user';
import { makeLogger } from '../../functions/logger';
import { encrypt } from '../../functions/encryption';

const logger = makeLogger('CreateUser');

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as CreateUserInput;

    const { email, password, password_confirmation } = data;

    if (!validate(email)) return badRequest(res, 'Invalid email.');
    if (password !== password_confirmation) {
      return badRequest(res, 'Password does not match.');
    }

    const checkEmail = await UsersModel.exists({ email });
    if (checkEmail) return badRequest(res, 'Email already exist.');

    const id = generateId(Entities.Users);

    const userInput = {
      id,
      email,
      password: await encrypt(password),
    };

    const user = await UsersModel.create(userInput);

    return created(res, 'User created successfully.', user);
  } catch (e) {
    logger.error(e);
    return badRequest(res, 'User is not created.');
  }
};

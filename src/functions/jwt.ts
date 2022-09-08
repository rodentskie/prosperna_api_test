import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';

import { LooseObject } from '../types/loose-object';
import { forbidden } from './response';

const PW: string = process.env.TOKEN_PW || 'mfmsosjwpxwszyzknnktjdvwqjspsqpw';

// generate token that will expire in 5hrs
export const generateAccessToken = (data: LooseObject) => {
  const token: string = sign({ data }, PW, {
    expiresIn: '5h',
  });
  return token;
};

// middleware to validate token
export const validateAccessToken = (
  req: Request,
  res: Response,
): string | JwtPayload => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return forbidden(res);
    const auth = authorization.split(' ');

    if (auth.length === 0) return forbidden(res);
    if (auth[0].toLowerCase() !== 'bearer') return forbidden(res);

    const token = auth[1]; // users token

    const user = verify(token, PW);
    return user;
  } catch (e) {
    return forbidden(res);
  }
};

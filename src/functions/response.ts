import { Response } from 'express';

import { LooseObject } from '../types/loose-object';

// custom responses

export const forbidden = (res: Response) => res.sendStatus(403);

export const badRequest = (res: Response, msg?: string) => {
  const message = msg || 'Bad Request';

  return res.status(400).send({ message });
};

export const created = (res: Response, msg?: string, data?: LooseObject) => {
  const message = msg || 'Created';

  return res.status(201).send({ message, data });
};

export const ok = (res: Response, msg?: string, data?: LooseObject) => {
  const message = msg || 'OK';

  return res.status(200).send({ message, data });
};

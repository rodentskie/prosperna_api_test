import { random, internet } from 'faker';

import { UsersModel } from '../../../src/models/user';
import { generateId } from '../../../src/functions/generate-id';
import { Entities } from '../../../src/entity';
import { encrypt } from '../../../src/functions/encryption';

export const fakeUserData = () => {
  const password = random.alpha({ count: 8 });

  return {
    email: internet.email(),
    password,
    password_confirmation: password,
  };
};

export const fakeUserDataInvalidEmail = () => {
  const password = random.alpha({ count: 8 });

  return {
    email: random.alpha({ count: 8 }),
    password,
    password_confirmation: password,
  };
};

export const fakeUserDataPasswordNoMatch = () => {
  return {
    email: internet.email(),
    password: random.alpha({ count: 8 }),
    password_confirmation: random.alpha({ count: 8 }),
  };
};

export const returnExistingUser = async () => {
  const user = fakeUserData();
  const id = generateId(Entities.Users);

  await UsersModel.create({
    id,
    ...user,
  });

  return user;
};

export const fakeUserDataForLogin = async () => {
  const password = random.alpha({ count: 8 });
  const hash = await encrypt(password);
  const email = internet.email();
  const id = generateId(Entities.Users);

  const user = {
    id,
    email,
    password: hash,
  };

  await UsersModel.create({
    ...user,
  });

  return { email, password };
};

export const fakeUserDataForLoginNewEmail = async () => {
  const password = random.alpha({ count: 8 });
  const hash = await encrypt(password);
  const email = internet.email();
  const newEmail = internet.email();
  const id = generateId(Entities.Users);

  const user = {
    id,
    email,
    password: hash,
  };

  await UsersModel.create({
    ...user,
  });

  return { newEmail, password };
};

export const fakeUserDataForLoginNewPassword = async () => {
  const password = random.alpha({ count: 8 });
  const newPassword = random.alpha({ count: 8 });
  const hash = await encrypt(password);
  const email = internet.email();
  const id = generateId(Entities.Users);

  const user = {
    id,
    email,
    password: hash,
  };

  await UsersModel.create({
    ...user,
  });

  return { email, newPassword };
};

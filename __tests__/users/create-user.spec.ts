import { expect } from 'chai';
import request from 'supertest';

import {
  fakeUserData,
  fakeUserDataInvalidEmail,
  fakeUserDataPasswordNoMatch,
  returnExistingUser,
} from '../helpers/users';

afterEach(async () => {});

describe('Create user test suite.', () => {
  it('Successful create of user.', async function () {
    const user = fakeUserData();

    const res = await request(this.server)
      .post('/api/users')
      .send({ ...user });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(201);
    expect(body.message).which.is.a('string').eq('User created successfully.');
  });

  it('Create of user, invalid email.', async function () {
    const user = fakeUserDataInvalidEmail();

    const res = await request(this.server)
      .post('/api/users')
      .send({ ...user });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid email.');
  });

  it("Create of user, password doesn't match.", async function () {
    const user = fakeUserDataPasswordNoMatch();

    const res = await request(this.server)
      .post('/api/users')
      .send({ ...user });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Password does not match.');
  });

  it('Create of user, email already exist.', async function () {
    const user = await returnExistingUser();

    const res = await request(this.server)
      .post('/api/users')
      .send({ ...user });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Email already exist.');
  });
});

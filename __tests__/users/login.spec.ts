import { expect } from 'chai';
import request from 'supertest';

import {
  fakeUserDataForLogin,
  fakeUserDataForLoginNewEmail,
  fakeUserDataForLoginNewPassword,
} from '../helpers/users';
import { UsersModel } from '../../src/models/user';

afterEach(async () => {
  await UsersModel.deleteMany();
});

describe('Login user test suite.', () => {
  it('Successful login of user.', async function () {
    const { email, password } = await fakeUserDataForLogin();

    const res = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(200);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq('Successfully login.');
    expect(body).to.have.property('data');
    expect(body.data).to.have.property('token');
    expect(body.message).which.is.a('string');
  });
  it("Login of user, user doesn't exist.", async function () {
    const { newEmail: email, password } = await fakeUserDataForLoginNewEmail();

    const res = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq("User doesn't exist.");
  });
  it('Login of user, incorrect password', async function () {
    const { email, newPassword: password } =
      await fakeUserDataForLoginNewPassword();

    const res = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq('Incorrect password.');
  });
});

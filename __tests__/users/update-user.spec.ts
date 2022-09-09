import { expect, assert } from 'chai';
import request from 'supertest';

import {
  fakeUserDataForLogin,
  fakeUserData,
  getOneUser,
  fakeUserDataInvalidEmail,
  fakeUserDataPasswordNoMatch,
  returnExistingUser,
} from '../helpers/users';
import { UsersModel } from '../../src/models/user';

afterEach(async () => {
  await UsersModel.deleteMany();
});

describe('Update user test suite.', () => {
  it('Successful update of user.', async function () {
    const user = await fakeUserDataForLogin();

    const toUpdateData = fakeUserData();

    const { id, email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .patch(`/api/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status } = res;
    const updatedData = await getOneUser(id);
    if (!updatedData) return assert.fail("User doesn't exist.");

    expect(status).which.is.a('number').eq(204);
    expect(updatedData.email).not.eq(email);
  });

  it('Update of user, invalid email.', async function () {
    const user = await fakeUserDataForLogin();

    const toUpdateData = fakeUserDataInvalidEmail();

    const { id, email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .patch(`/api/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;
    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid email.');
  });

  it("Update of user, password doesn't match.", async function () {
    const user = await fakeUserDataForLogin();

    const toUpdateData = fakeUserDataPasswordNoMatch();

    const { id, email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .patch(`/api/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Password does not match.');
  });

  it('Update of user, email already exist.', async function () {
    const user = await fakeUserDataForLogin();

    const toUpdateData1 = await returnExistingUser();
    const toUpdateData2 = await returnExistingUser();

    const { id, email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    toUpdateData2.email = toUpdateData1.email; // pass email
    const res = await request(this.server)
      .patch(`/api/users/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData2,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Email already exist.');
  });

  it('Update of user, not logged in.', async function () {
    const user = await fakeUserDataForLogin();

    const toUpdateData = fakeUserData();

    const { id } = user;

    const res = await request(this.server)
      .patch(`/api/users/${id}`)
      .send({
        ...toUpdateData,
      });

    const { status } = res;
    expect(status).which.is.a('number').eq(403);
  });

  it('Update of user, different user tried to update.', async function () {
    const user1 = await fakeUserDataForLogin();
    const user2 = await fakeUserDataForLogin();

    const toUpdateData = fakeUserData();

    const { email, password } = user1;
    const { id: userTwoId } = user2;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .patch(`/api/users/${userTwoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;
    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Not allowed to update.');
  });
});

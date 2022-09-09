import { expect } from 'chai';
import request from 'supertest';

import { returnExistingUserFromDB } from '../helpers/users';
import { UsersModel } from '../../src/models/user';

afterEach(async () => {
  await UsersModel.deleteMany();
});

describe('Get single user test suite.', () => {
  it('Successful get of single user, returned with data.', async function () {
    const user = await returnExistingUserFromDB();

    const { _id: id } = user;
    const res = await request(this.server).get(`/api/users/${id}`);
    const { status, body } = res;

    expect(status).which.is.a('number').eq(200);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq('OK');
    expect(body).to.have.property('data');
    expect(body.data).to.have.property('users');
    expect(body.data.users).to.be.an('object');
  });
  it('Successful get of single user, returned without data.', async function () {
    const user = await returnExistingUserFromDB();

    const { _id: id } = user;
    const res = await request(this.server).get(`/api/users/${id}abc`);
    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq("User doesn't exist.");
  });
});

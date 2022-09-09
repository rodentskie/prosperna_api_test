import { expect } from 'chai';
import request from 'supertest';

import { returnExistingUser } from '../helpers/users';
import { UsersModel } from '../../src/models/user';

afterEach(async () => {
  await UsersModel.deleteMany();
});

describe('Get all users test suite.', () => {
  it('Successful get of all users, returned with data.', async function () {
    await returnExistingUser();

    const res = await request(this.server).get('/api/users');

    const { status, body } = res;

    expect(status).which.is.a('number').eq(200);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq('OK');
    expect(body).to.have.property('data');
    expect(body.data).to.have.property('users');
    expect(body.data.users).to.be.an('array');
    expect(body.data.users.length)
      .which.is.a('number')
      .gt(0)
      .and.satisfy(Number.isInteger);
  });
  it('Successful get of all users, returned without data.', async function () {
    const res = await request(this.server).get('/api/users');

    const { status, body } = res;

    expect(status).which.is.a('number').eq(200);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq('OK');
    expect(body).to.have.property('data');
    expect(body.data).to.have.property('users');
    expect(body.data.users).to.be.an('array');
    expect(body.data.users.length)
      .which.is.a('number')
      .eq(0)
      .and.satisfy(Number.isInteger);
  });
});

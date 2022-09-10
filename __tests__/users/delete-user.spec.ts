import { expect } from 'chai';
import request from 'supertest';

import { returnExistingUserFromDB } from '../helpers/users';
import { UsersModel } from '../../src/models/user';

afterEach(async () => {
  await UsersModel.deleteMany();
});

describe('Delete single user test suite.', () => {
  it('Successful delete of single user.', async function () {
    const user = await returnExistingUserFromDB();

    const { _id: id } = user;
    const res = await request(this.server).delete(`/api/users/${id}`);
    const { status } = res;

    expect(status).which.is.a('number').eq(204);
  });

  it("Delete of single user that doesn't exist.", async function () {
    const user = await returnExistingUserFromDB();

    const { _id: id } = user;
    const res = await request(this.server).delete(`/api/users/${id}s`);
    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body).to.have.property('message');
    expect(body.message)
      .which.is.a('string')
      .eq('Error on delete, please check.');
  });
});

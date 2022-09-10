import { expect } from 'chai';
import request from 'supertest';

import { fakeUserDataForLogin } from '../helpers/users';
import { returnFakeProductAndUser } from '../helpers/products';
import { UsersModel } from '../../src/models/user';
import { ProductsModel } from '../../src/models/products';

afterEach(async () => {
  await UsersModel.deleteMany();
  await ProductsModel.deleteMany();
});

describe('Delete product test suite.', () => {
  it('Successful delete of product.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .delete(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`);

    const { status } = res;

    expect(status).which.is.a('number').eq(204);
  });
  it("Delete of product that doesn't exist.", async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .delete(`/api/products/${id}s`)
      .set('Authorization', `Bearer ${token}`);

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body).to.have.property('message');
    expect(body.message)
      .which.is.a('string')
      .eq('Error on delete, please check.');
  });
});

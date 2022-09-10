import { expect, assert } from 'chai';
import request from 'supertest';

import {
  returnFakeProductAndUser,
  getOneProduct,
  fakeProductData,
  fakeProductDataNoName,
  fakeProductDataNoDesc,
  fakeProductDataDescNotString,
  fakeProductDataPrizeZero,
  fakeProductDataNoPrice,
  fakeProductDataTagNotArray,
  fakeProductDataTagNotString,
  fakeProductDataAlreadyExist,
  fakeProductDataNameNotString,
} from '../helpers/products';
import { UsersModel } from '../../src/models/user';
import { ProductsModel } from '../../src/models/products';

afterEach(async () => {
  await UsersModel.deleteMany();
  await ProductsModel.deleteMany();
});

describe('Update product test suite.', () => {
  it('Successful update of product.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductData();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status } = res;
    const updatedData = await getOneProduct(id);
    if (!updatedData) return assert.fail("User doesn't exist.");

    expect(status).which.is.a('number').eq(204);
    expect(updatedData.name).not.eq(product.name);
    expect(updatedData.description).not.eq(product.description);
    expect(updatedData.price).not.eq(product.price);
    expect(updatedData.tag).not.eql(product.tag);
  });
  it('Update of product, no input for product name.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductDataNoName();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product name.');
  });
  it('Update of product, product name is not string.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductDataNameNotString();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product name.');
  });
  it('Update of product, no input for product description.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductDataNoDesc();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message)
      .which.is.a('string')
      .eq('Invalid product description.');
  });
  it('Update of product, product description is not string.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductDataDescNotString();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message)
      .which.is.a('string')
      .eq('Invalid product description.');
  });
  it('Update of product, product price is 0.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductDataPrizeZero();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product price.');
  });
  it('Update of product, no input for product price.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductDataNoPrice();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product price.');
  });
  it('Update of product, product tags is not an array.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductDataTagNotArray();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product tag.');
  });
  it('Update of product, a product tag is not a string.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductDataTagNotString();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message)
      .which.is.a('string')
      .eq('Incorrect product tag input.');
  });
  it('Update of product, product already exist.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = product;

    const productControl = await fakeProductDataAlreadyExist(id);
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...productControl,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Product already exist.');
  });
  it('Update of product, by different user.', async function () {
    const { res: product, user, password } = await returnFakeProductAndUser();
    const { res: newProduct } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductData();

    const { email } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const { _id: id } = newProduct;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...toUpdateData,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Not allowed to update.');
  });
  it('Update of product, not logged in.', async function () {
    const { res: product } = await returnFakeProductAndUser();
    const toUpdateData = fakeProductData();

    const { _id: id } = product;
    const res = await request(this.server)
      .patch(`/api/products/${id}`)
      .send({
        ...toUpdateData,
      });

    const { status } = res;

    expect(status).which.is.a('number').eq(403);
  });
});

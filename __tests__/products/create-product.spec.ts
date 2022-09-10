import { expect } from 'chai';
import request from 'supertest';

import { fakeUserDataForLogin } from '../helpers/users';
import {
  fakeProductData,
  fakeProductDataNameNotString,
  fakeProductDataNoName,
  fakeProductDataNoDesc,
  fakeProductDataDescNotString,
  fakeProductDataPrizeZero,
  fakeProductDataNoPrice,
  fakeProductDataTagNotArray,
  fakeProductDataTagNotString,
  fakeProductDataAlreadyExist,
} from '../helpers/products';
import { UsersModel } from '../../src/models/user';
import { ProductsModel } from '../../src/models/products';

afterEach(async () => {
  await UsersModel.deleteMany();
  await ProductsModel.deleteMany();
});

describe('Create product test suite.', () => {
  it('Successful create of product.', async function () {
    const user = await fakeUserDataForLogin();
    const product = fakeProductData();

    const { email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(201);
    expect(body.message)
      .which.is.a('string')
      .eq('Product created successfully.');
  });
  it('Create of product, no input for product name.', async function () {
    const user = await fakeUserDataForLogin();
    const product = fakeProductDataNoName();

    const { email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product name.');
  });
  it('Create of product, product name is not string.', async function () {
    const user = await fakeUserDataForLogin();
    const product = fakeProductDataNameNotString();

    const { email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product name.');
  });
  it('Create of product, no input for product description.', async function () {
    const user = await fakeUserDataForLogin();
    const product = fakeProductDataNoDesc();

    const { email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message)
      .which.is.a('string')
      .eq('Invalid product description.');
  });
  it('Create of product, product description is not string.', async function () {
    const user = await fakeUserDataForLogin();
    const product = fakeProductDataDescNotString();

    const { email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message)
      .which.is.a('string')
      .eq('Invalid product description.');
  });
  it('Create of product, product price is 0.', async function () {
    const user = await fakeUserDataForLogin();
    const product = fakeProductDataPrizeZero();

    const { email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product price.');
  });
  it('Create of product, no input for product price.', async function () {
    const user = await fakeUserDataForLogin();
    const product = fakeProductDataNoPrice();

    const { email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product price.');
  });
  it('Create of product, product tags is not an array.', async function () {
    const user = await fakeUserDataForLogin();
    const product = fakeProductDataTagNotArray();

    const { email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Invalid product tag.');
  });
  it('Create of product, a product tag is not a string.', async function () {
    const user = await fakeUserDataForLogin();
    const product = fakeProductDataTagNotString();

    const { email, password } = user;

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message)
      .which.is.a('string')
      .eq('Incorrect product tag input.');
  });
  it('Create of product, product already exist.', async function () {
    const user = await fakeUserDataForLogin();

    const { id, email, password } = user;

    const product = await fakeProductDataAlreadyExist(id);

    const login = await request(this.server)
      .post('/api/login')
      .send({ email, password });

    const { body: loginBody } = login;
    const { data: loginData } = loginBody;
    const { token } = loginData;

    const res = await request(this.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...product,
      });

    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body.message).which.is.a('string').eq('Product already exist.');
  });
});

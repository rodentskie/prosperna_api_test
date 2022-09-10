import { expect } from 'chai';
import request from 'supertest';

import { returnFakeProduct } from '../helpers/products';
import { ProductsModel } from '../../src/models/products';

afterEach(async () => {
  await ProductsModel.deleteMany();
});

describe('Get all products test suite.', () => {
  it('Successful get of all products, returned with data.', async function () {
    await returnFakeProduct();

    const res = await request(this.server).get('/api/products');
    const { status, body } = res;

    expect(status).which.is.a('number').eq(200);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq('OK');
    expect(body).to.have.property('data');
    expect(body.data).to.have.property('products');
    expect(body.data.products).to.be.an('array');
    expect(body.data.products.length)
      .which.is.a('number')
      .gt(0)
      .and.satisfy(Number.isInteger);
  });
  it('Successful get of all products, returned without data.', async function () {
    const res = await request(this.server).get('/api/products');
    const { status, body } = res;

    expect(status).which.is.a('number').eq(200);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq('OK');
    expect(body).to.have.property('data');
    expect(body.data).to.have.property('products');
    expect(body.data.products).to.be.an('array');
    expect(body.data.products.length)
      .which.is.a('number')
      .eq(0)
      .and.satisfy(Number.isInteger);
  });
});

import { expect } from 'chai';
import request from 'supertest';

import { returnFakeProduct } from '../helpers/products';
import { ProductsModel } from '../../src/models/products';

afterEach(async () => {
  await ProductsModel.deleteMany();
});

describe('Get single product test suite.', () => {
  it('Successful get of single product, returned with data.', async function () {
    const product = await returnFakeProduct();
    const { _id: id } = product;
    const res = await request(this.server).get(`/api/products/${id}`);
    const { status, body } = res;

    expect(status).which.is.a('number').eq(200);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq('OK');
    expect(body).to.have.property('data');
    expect(body.data).to.have.property('product');
    expect(body.data.product).to.be.an('object');
  });
  it('Successful get of single product, returned without data.', async function () {
    const product = await returnFakeProduct();
    const { _id: id } = product;
    const res = await request(this.server).get(`/api/products/${id}a`);
    const { status, body } = res;

    expect(status).which.is.a('number').eq(400);
    expect(body).to.have.property('message');
    expect(body.message).which.is.a('string').eq("Product doesn't exist.");
  });
});

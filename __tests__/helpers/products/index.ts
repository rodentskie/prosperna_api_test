import { commerce } from 'faker';
import { ProductsModel } from '../../../src/models/products';

export const fakeProductData = () => {
  return {
    product_name: commerce.product(),
    product_description: commerce.productDescription(),
    product_price: parseFloat(commerce.price()),
    product_tag: [
      commerce.productAdjective(),
      commerce.productAdjective(),
      commerce.productAdjective(),
    ],
  };
};

export const fakeProductDataAlreadyExist = async (userId: string) => {
  const product = {
    product_name: commerce.product(),
    product_description: commerce.productDescription(),
    product_price: parseFloat(commerce.price()),
    product_tag: [
      commerce.productAdjective(),
      commerce.productAdjective(),
      commerce.productAdjective(),
    ],
  };

  const {
    product_name: name,
    product_description: description,
    product_price: price,
    product_tag: tag,
  } = product;

  await ProductsModel.create({
    name,
    description,
    price,
    tag,
    userId,
  });

  return product;
};

export const fakeProductDataTagNotString = () => {
  return {
    product_name: commerce.product(),
    product_description: commerce.productDescription(),
    product_price: parseFloat(commerce.price()),
    product_tag: [
      commerce.productAdjective(),
      parseFloat(commerce.price()),
      commerce.productAdjective(),
    ],
  };
};

export const fakeProductDataTagNotArray = () => {
  return {
    product_name: commerce.product(),
    product_description: commerce.productDescription(),
    product_price: parseFloat(commerce.price()),
    product_tag: {
      tag: commerce.productAdjective(),
    },
  };
};

export const fakeProductDataNoPrice = () => {
  return {
    product_name: commerce.product(),
    product_description: commerce.productDescription(),
    product_tag: [
      commerce.productAdjective(),
      commerce.productAdjective(),
      commerce.productAdjective(),
    ],
  };
};

export const fakeProductDataPrizeZero = () => {
  return {
    product_name: commerce.product(),
    product_description: commerce.productDescription(),
    product_price: 0,
    product_tag: [
      commerce.productAdjective(),
      commerce.productAdjective(),
      commerce.productAdjective(),
    ],
  };
};

export const fakeProductDataDescNotString = () => {
  return {
    product_name: commerce.product(),
    product_description: parseFloat(commerce.price()),
    product_price: parseFloat(commerce.price()),
    product_tag: [
      commerce.productAdjective(),
      commerce.productAdjective(),
      commerce.productAdjective(),
    ],
  };
};

export const fakeProductDataNoDesc = () => {
  return {
    product_name: commerce.product(),
    product_price: parseFloat(commerce.price()),
    product_tag: [
      commerce.productAdjective(),
      commerce.productAdjective(),
      commerce.productAdjective(),
    ],
  };
};

export const fakeProductDataNoName = () => {
  return {
    product_description: commerce.productDescription(),
    product_price: parseFloat(commerce.price()),
    product_tag: [
      commerce.productAdjective(),
      commerce.productAdjective(),
      commerce.productAdjective(),
    ],
  };
};

export const fakeProductDataNameNotString = () => {
  return {
    product_name: parseFloat(commerce.price()),
    product_description: commerce.productDescription(),
    product_price: parseFloat(commerce.price()),
    product_tag: [
      commerce.productAdjective(),
      commerce.productAdjective(),
      commerce.productAdjective(),
    ],
  };
};

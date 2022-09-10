import { Schema, model } from 'mongoose';

import { Products } from '../types/products';

const schema = new Schema<Products>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tag: [String],
    userId: { type: String, required: true, ref: 'Users' },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);

const ProductsModel = model<Products>('Products', schema);

export { ProductsModel };

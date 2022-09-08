import { Schema, model } from 'mongoose';

import { Products } from '../types/products';

const schema = new Schema<Products>(
  {
    id: { type: Buffer, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    tag: [String],
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);

const ProductsModel = model<Products>('Products', schema);

export { ProductsModel };

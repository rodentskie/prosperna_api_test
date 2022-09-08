import { Schema, model } from 'mongoose';

import { Users } from '../types/users';

const schema = new Schema<Users>(
  {
    id: { type: Buffer, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
  },
);

const UsersModel = model<Users>('Users', schema);

export { UsersModel };

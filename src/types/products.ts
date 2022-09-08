interface Products {
  id: Buffer;
  userId: Buffer;
  name: string;
  description: string;
  tag: string[];
  createdAt: Date;
  updatedAt: Date;
}

export { Products };

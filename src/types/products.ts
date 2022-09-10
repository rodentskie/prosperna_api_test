interface Products {
  name: string;
  description: string;
  tag: string[];
  price: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateProductInput {
  product_name: string;
  product_description: string;
  product_price: number;
  product_tag: string[];
}

export { Products, CreateProductInput };

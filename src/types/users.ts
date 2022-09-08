interface Users {
  id: Buffer;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateUserInput {
  email: string;
  password: string;
  password_confirmation: string;
}

export { Users, CreateUserInput };

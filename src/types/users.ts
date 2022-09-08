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

interface LoginInput {
  email: string;
  password: string;
}

export { Users, CreateUserInput, LoginInput };

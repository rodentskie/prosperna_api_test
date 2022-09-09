interface Users {
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

interface JwtVerifyResult {
  data: {
    id: string;
  };
  iat: number;
  exp: number;
}

interface UpdateUserInput {
  email: string;
  password: string;
  password_confirmation: string;
}

export { Users, CreateUserInput, LoginInput, JwtVerifyResult, UpdateUserInput };

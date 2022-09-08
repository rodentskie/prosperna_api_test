import { hash, compare, genSalt } from 'bcrypt';

const encrypt = async (str: string) => {
  const salt = await genSalt(12);
  return hash(str, salt);
};

const validateData = async (data: string, hashed: string) => {
  return compare(data, hashed);
};

export { encrypt, validateData };

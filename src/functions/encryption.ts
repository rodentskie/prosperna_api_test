import { hash, compare, genSalt } from 'bcrypt';

// hash function
const encrypt = async (str: string) => {
  const salt = await genSalt(12);
  return hash(str, salt);
};

// validate if string and hash is equal or not
const validateData = async (data: string, hashed: string) => compare(data, hashed);

export { encrypt, validateData };

// to convert buffer to string hex
export const bufferToString = (data: Buffer) => {
  if (!(data instanceof Buffer)) {
    throw new Error('Invalid return type for Binary');
  }
  return data.toString('hex');
};

// to convert string hex to buffer
export const stringToBuffer = (data: string) => Buffer.from(data, 'hex');

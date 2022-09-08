import crypto from 'crypto';

// generate Buffer ID
export function generateId(type: number): Buffer {
  return Buffer.concat([Buffer.from([type]), crypto.randomBytes(15)]);
}

import crypto from 'crypto';

export function generateId(type: number): Buffer {
  return Buffer.concat([Buffer.from([type]), crypto.randomBytes(15)]);
}

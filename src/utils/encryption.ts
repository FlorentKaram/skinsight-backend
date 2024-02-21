import { createCipheriv, randomBytes, scrypt, scryptSync } from 'crypto';
import { promisify } from 'util';

// TODO : .env variable
const secret = 'a secret that should be stored in an environment variable';

const iv = randomBytes(16);
const key = scryptSync(secret, 'salt', 32);

const cipher = createCipheriv('aes-256-ctr', key, iv);

const encrypt = (text: string) => {
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

const decrypt = (text: string) => {
  const [ivString, encryptedString] = text.split(':');
  const iv = Buffer.from(ivString, 'hex');
  const encryptedText = Buffer.from(encryptedString, 'hex');
  const decipher = createCipheriv('aes-256-ctr', key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString();
};

export { encrypt, decrypt };

import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scryptSync } from 'crypto';

@Injectable()
export class EncryptionService {
  private secret: string;
  private key: Buffer;
  private ids: string[];

  constructor() {
    this.secret = 'a secret that should be stored in an environment variable'; // process.env.SECRET;
    this.key = scryptSync(this.secret, 'salt', 32);

    this.ids = [
      'id',
      'patientId',
      'consultationId',
      'dermatologistId',
      'conversationId',
      'userId',
      'generalistId',
    ];
  }

  encryptObject(object: { [key: string]: any }, blackList?: string[]) {
    const encryptedObject: any = {};
    for (const key in object) {
      if (blackList?.includes(key) || this.ids.includes(key)) {
        encryptedObject[key] = object[key] as any;
      } else if (typeof object[key] === 'string') {
        encryptedObject[key] = this.encryptText(object[key]);
      } else if (Array.isArray(object[key])) {
        encryptedObject[key] = object[key].map((item: any) => {
          if (typeof item === 'string') {
            return this.encryptText(item);
          } else {
            return this.encryptObject(item);
          }
        });
      } else {
        encryptedObject[key] = object[key];
      }
    }
    return encryptedObject;
  }

  encryptText(text: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-ctr', this.key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decryptObject(object: { [key: string]: any }, blackList?: string[]) {
    const decryptedObject: any = {};
    for (const key in object) {
      if (
        typeof object[key] === 'string' &&
        !blackList?.includes(key) &&
        !this.ids.includes(key)
      ) {
        decryptedObject[key] = this.decryptText(object[key]);
      } else if (Array.isArray(object[key])) {
        decryptedObject[key] = object[key].map((item: any) => {
          if (typeof item === 'string') {
            return this.decryptText(item);
          } else {
            return this.decryptObject(item);
          }
        });
      } else {
        decryptedObject[key] = object[key];
      }
    }
    return decryptedObject;
  }

  decryptText(text: string) {
    const [ivString, encryptedString] = text.split(':');

    if (!ivString || !encryptedString) {
      return text;
    }
    const iv = Buffer.from(ivString, 'hex');
    const encryptedText = Buffer.from(encryptedString, 'hex');
    const decipher = createCipheriv('aes-256-ctr', this.key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);
    return decrypted.toString();
  }
}

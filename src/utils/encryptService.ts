import CryptoJS from "crypto-js";

const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

export const encryptService = (plainText: string) => {
  return CryptoJS.AES.encrypt(plainText, encryptionKey!).toString();
};

export const decryptService = (cipherText: string) => {
  return CryptoJS.AES.decrypt(cipherText, encryptionKey!).toString(
    CryptoJS.enc.Utf8,
  );
};

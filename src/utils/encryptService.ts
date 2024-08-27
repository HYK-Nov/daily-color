import CryptoJS from "crypto-js";

const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;

export const encrypt = (plainText: string) => {
  try {
    return CryptoJS.AES.encrypt(plainText, encryptionKey).toString();
  } catch (err) {
    console.error("Encryption error: ", err);
    return null;
  }
};

export const decrypt = (encryptedText: string) => {
  try {
    return CryptoJS.AES.decrypt(encryptedText, encryptionKey).toString(
      CryptoJS.enc.Utf8,
    );
  } catch (err) {
    console.error("Decryption error: ", err);
    return null;
  }
};

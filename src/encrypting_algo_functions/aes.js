import { encrypt, decrypt } from 'encrypt-with-password';

export function aes_validate_encrypt(word, hasKey, key) {
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!key) {
    return { success: false, message: 'Input your key please.' };
  }
  return { success: true };
}

export function aes_validate_decrypt(word, hasKey, key, encryptedText) {
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!key) {
    return { success: false, message: 'Input your key please.' };
  }
  if (!encryptedText) {
    return { success: false, message: 'You have to have an encrypted text by this function.' }
  }
  return { success: true };
}

export function aes_encrypt(message, key) {
  return encrypt(message, key);
}


export function aes_decrypt(message, key) {
  return decrypt(message, key);
}

export const AES_DESC = 'Vigenere Cipher is a method of encrypting alphabetic text.'
export const AES_DESC_LONG = 'gdghdhg';

import NodeRSA from 'node-rsa';

export function rsa_validate_encrypt(word, hasKey, key) {
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!key) {
    return { success: false, message: 'Input your key please.' };
  }
  if (key % 8 !== 0) {
    return { success: false, message: 'The key has to be a multiple of 8.' }
  }
  return { success: true };
}

export function rsa_validate_decrypt(word, hasKey, key, encryptedText) {
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!key) {
    return { success: false, message: 'Input your key please.' };
  }
  if (key % 8 !== 0) {
    return { success: false, message: 'The key has to be a multiple of 8.' }
  }
  if (!encryptedText) {
    return { success: false, message: 'You have to have an encrypted text by this function.' }
  }
  return { success: true };
}

let nodeRsa;

export function rsa_encrypt(message, key) {
  nodeRsa = new NodeRSA({b : key});
  return nodeRsa.encrypt(message, 'base64');
}


export function rsa_decrypt(message, key) {
  return nodeRsa.decrypt(message, 'utf8');
}

export const RSA_DESC = 'Vigenere Cipher is a method of encrypting alphabetic text.'
export const RSA_DESC_LONG = 'gdghdhg';

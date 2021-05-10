const CryptoJs = require('crypto-js');

export function rabbit_validate_encrypt(word, hasKey, key) {
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!key) {
    return { success: false, message: 'Input your key please.' };
  }
  return { success: true };
}

export function rabbit_validate_decrypt(word, hasKey, key, encryptedText) {
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

export function rabbit_encrypt(message, key) {
  return CryptoJs.Rabbit.encrypt(message, key).toString();
}

export function rabbit_decrypt(message, key) {
  return CryptoJs.Rabbit.decrypt(message, key).toString(CryptoJs.enc.Utf8);
}

export const RABBIT_DESC = "Rabbit is a stream cipher algorithm that has been designed for high performance in software" +
  " implementations. Both key setup and encryption are very fast";

export const RABBIT_DESC_LONG = 'Rabbit uses a 128-bit key and a 64-bit initialization vector. ' +
  'The cipher was designed with high performance in software in mind, where fully optimized implementations ' +
  'achieve an encryption speed of up to 3.7 CPB on a Pentium 3, and of 9.7 CPB on an ARM7. However, the cipher also ' +
  'turns out to be very fast and compact in hardware.  The core component of the cipher is a bitstream generator' +
  ' which encrypts 128 message bits per iteration. The cipher\'s strength rests on a strong mixing of its ' +
  'inner state between two consecutive iterations. The mixing function is entirely based on arithmetical ' +
  'operations that are available on a modern processor, i.e., no S-boxes or lookup tables are required to ' +
  'implement the cipher. The mixing function uses a g-function based on arithmetical squaring, and the ARX ' +
  'operations -- logical XOR, bit-wise rotation with hard-wired rotation amounts, and addition modulo 232.  ' +
  'The g-function used in Rabbit -- squaring a 32-bit number to produce a 64-bit number, and then combining ' +
  'the left half and the right half of that square number with xor, to produce a 32-bit result -- provides much ' +
  'better results than using the 32 middle bits of that square number (the middle-square method).';

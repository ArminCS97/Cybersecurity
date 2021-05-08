import ALPHABET from './params';

const PRIME_NUMBER1 = 2147483647
const PRIME_NUMBER2 = 6700417

export function affine_validate(word) {
  let letters = /^[A-Za-z]+$/;
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!word.match(letters)) {
    return { success: false, message: 'No digits or white spaces allowed for this function.' };
  }
  return { success: true };
}


export function affine_encrypt(word) {
  for (let i = 0; i < word.length; i++) {
    let alphaIndex = ALPHABET.indexOf(word[i]);
    let troublesome = (PRIME_NUMBER1 * alphaIndex + PRIME_NUMBER2) % ALPHABET.length;
    word = word.substring(0, i) + ALPHABET[troublesome] + word.substring(i + 1);
  }
  return word;
}

export function affine_decrypt(word) {
  for (let i = 0; i < word.length; i++) {
    const a = PRIME_NUMBER1 % ALPHABET.length;
    //Bruteforce the modular invert of the a

    let invert = 0;
    for (let j = 1; j < ALPHABET.length; j++) {
      if ((a * j) % ALPHABET.length === 1)
        invert = j;
    }
    let alphaIndex = ALPHABET.indexOf(word[i]);

    let troublesome = (invert * (alphaIndex - PRIME_NUMBER2)) % ALPHABET.length;
    if (troublesome < 0)
      troublesome += ALPHABET.length;
    word = word.substring(0, i) + ALPHABET[troublesome] + word.substring(i + 1);
  }
  return word;
}


export const DESC_AFFINE = 'The affine cipher is a type of monoalphabetic substitution cipher, where each letter in an ' +
  'alphabet is mapped to its numeric equivalent'
export const LONG_DESC_AFFINE = 'meaning the cipher is essentially a standard substitution cipher with a rule ' +
  'governing which' +
  ' letter goes to which. As such, it has the weaknesses of all substitution ciphers.' +
  ' Each letter is enciphered with the function (ax + b) mod 26, where b is the magnitude of the shift.' +
  ' letter goes to which. As such, it has the weaknesses of all substitution ciphers.' +
  ' Each letter is enciphered with the function (ax + b) mod 26, where b is the magnitude of the shift';

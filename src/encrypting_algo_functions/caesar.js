import ALPHABET from './params';

const PRIME_NUMBER1 = 1
const PRIME_NUMBER2 = 2

export function caesar_validate(word) {
  let letters = /^[A-Za-z]+$/;
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!word.match(letters)) {
    return { success: false, message: 'No digits or white spaces allowed for this function.' };
  }
  return { success: true };
}

// This function assumes that word is already validated and is a valid word.
export function caesar_encrypt(word) {
  for (let i = 0; i < word.length; i++) {
    let alphaIndex = ALPHABET.indexOf(word[i]);
    let troublesome = (PRIME_NUMBER1 * alphaIndex + PRIME_NUMBER2) % ALPHABET.length;
    word = word.substring(0, i) + ALPHABET[troublesome] + word.substring(i + 1);
  }
  return word;
}

// This function assumes that word is already validated and is a valid word.
export const caesar_decrypt = (word) => {
  let prime_number1 = PRIME_NUMBER1;
  for (let i = 0; i < word.length; i++) {
    prime_number1 %= ALPHABET.length;

    // Bruteforce the modular invert of the a
    let invert = 0;
    for (let j = 1; j < ALPHABET.length; j++) {
      if ((prime_number1 * j) % ALPHABET.length === 1)
        invert = j;
    }
    var alphaIndex = ALPHABET.indexOf(word[i]);
    var troublesome = (invert * (alphaIndex - PRIME_NUMBER2)) % ALPHABET.length;
    if (troublesome < 0)
      troublesome += ALPHABET.length;
    word = word.substring(0, i) + ALPHABET[troublesome] + word.substring(i + 1);
  }
  return word;
}

export const DESC_CAESAR = 'The Caesar Cipher technique is one of the earliest and simplest method of encryption ' +
  'technique.'
export const LONG_DESC_CAESAR = 'It’s simply a type of substitution cipher, i.e., each letter of a given text is ' +
  'replaced by a letter some fixed number of positions down the alphabet';

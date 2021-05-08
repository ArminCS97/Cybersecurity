const SALT = 'mySecretSalt'

export function salt_cipher_validate(word) {
  if (!word) {
    return { success: false, message: 'You have to input your word.' };
  }
  return { success: true };
}

export function salt_encrypt(text) {
  // Create a cipher
  const myCipher = cipher(SALT)
  // Then cipher any text:
  return myCipher(text)
}


export function salt_decrypt(text) {
  // To decipher, you need to create a decipher and use it:
  const myDecipher = decipher(SALT)
  return myDecipher(text)
}

const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => ('0' + Number(n).toString(16)).substr(-2);
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text => text.split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
}

const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded => encoded.match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
}

export const SALT_DESC = 'In cryptography, a salt is random data that is used as an additional input to a one-way ' +
  'function.'
export const LONG_DESC_SALT = 'ghghjgghgj hkhjhjshjdshjdskds random data that is used as an additional input to a one-way';

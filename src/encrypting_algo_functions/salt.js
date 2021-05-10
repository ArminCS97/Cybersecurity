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
export const LONG_DESC_SALT = 'In cryptography, a salt is random data that is used as an additional input to a one-way ' +
  'function that hashes data, a password or passphrase. Salts are used to safeguard passwords in storage. Historically a ' +
  'password was stored in plaintext on a system, but over time, additional safeguards were developed to protect a user\'s ' +
  'password against being read from the system. A salt is one such method.A new salt is randomly generated for each ' +
  'password. Typically, the salt and the password (or its version after key stretching) are concatenated and ' +
  'fed to a cryptographic hash function, and the output hash value (but not the original password) is ' +
  'stored with the salt in a database. Hashing allows for later authentication without keeping and therefore ' +
  'risking exposure of the plaintext password if the authentication data store is compromised. Note that due to' +
  ' this, salts don\'t need to be encrypted or stored separately from the hashed password itself, because even if' +
  ' an attacker has access to the database with the hash values and the salts, the correct use of said salts will ' +
  'hinder any effective attempt to crack the passwords.Salts defend against attacks that use precomputed tables ' +
  '(e.g. rainbow tables)[1] as they can make the size of table needed for a successful attack prohibitively large ' +
  'without burdening users. Since salts differ from one another, they also protect redundant ' +
  '(e.g. commonly-used, re-used) passwords as different salted hashes are created for different instances of the same' +
  ' password.Cryptographic salts are broadly used in many modern computer systems, from Unix system credentials to' +
  ' Internet security.Salts are closely related to the concept of a cryptographic nonce.';

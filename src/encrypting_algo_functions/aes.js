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
    return { success: false, message: 'You have to have an encrypted text by this function.' };
  }
  return { success: true };
}

export function aes_encrypt(message, key) {
  return encrypt(message, key);
}


export function aes_decrypt(message, key) {
  return decrypt(message, key);
}

export const AES_DESC = 'A modern block symmetric cipher, one of the most popular ciphers in the world. It was ' +
  'developed in 1997 by Vincent Rijmen and Joan Daemen';
export const AES_DESC_LONG = 'Usage\n' +
  'AES is considered as a strong and secure cipher. Over last few years (mostly 2005-2010) several attacks against different AES implementations were described but generally speaking they concern just some special cases and are not considered to be a threat to the AES algorithm itself.\n' +
  'Algorithm\n' +
  'A secret key in AES, for both data encryption and decryption, may contain 128 or 192 or 256 bits. Based on the length of the key, a different number of encrypting cycles is performed.\n' +
  'Encryption\n' +
  'During encryption, the input data (plaintext) is divided into 128-bit blocks. The blocks of data are presented as column-major matrices of size 4 bytes × 4 bytes, called states. The following operations are performed for all blocks:\n' +
  '\t\t\tPreparing Subkeys: one starting subkey is created first, and later one more subkey for every subsequent cycle of encryption (see below).\n' +
  '\t\t\tInitial Round: all bytes of data block are added to corresponding bytes of the starting subkey using XOR operation.\n' +
  '\t\t\tA number of encrypting cycles takes place. The number of repetition depends on the length of a secret key:\n' +
  '\t\t\t-  9 cycles of repetition for a 128-bit key,\n' +
  '\t\t\t- 11 cycles of repetition for a 192-bit key,\n' +
  '\t\t\t- 13 cycles of repetition for a 256-bit key.\n' +
  '\t\t\t\n' +
  '\t\t\tThe following operations are performed during each encryption round:\n' +
  '\t\t\tEach byte of the state matrix is replaced with another byte, based on a lookup table, called Rijndael\'s S-Box. The operation is called the SB (Substitute Bytes) Operation. The construction of the lookup table guarantees that this substitution is non-linear.\n' +
  '\t\t\tThe bytes stored in the last three rows of the state matrix are shifted to the left. Note, that the bytes in the first row are not shifted at all. The bytes in the second row are shifted by one position, in the third row by two positions, and the bytes in the fourth row are shifted by three positions to the left. The leftmost bytes in each row moves to the right side of the same row. This state is called SR (Shift Rows) Operation.\n' +
  '\t\t\tMC (Mix Columns) Operation (the multiplication of columns): all columns are multiplied with a constant matrix of size 4 bytes × 4 bytes.\n' +
  '\t\t\tAR (Add Round Key) Operation: adding XOR all state bytes to the subkey bytes. A new subkey is created for every encryption round. Subkeys, like states, are 16-byte long.\n' +
  '\t\t\tFinal Round: the same operations are performed as in normal encryption rounds (described above), besides the multiplication of columns, which in the Final Round is omitted.\n' +
  'AES Key Expansion\n' +
  'AES uses a secret symmetric key, which contains 128, 192, or 256 bits (that is 16, 24, or 32 bytes respectively). In order to encrypt all data blocks, the key must be expanded. The new bytes are appended to the original bytes of the key:\n' +
  '◦\tA 128-bit key (16 bytes) is expanded to 176 bytes.\n' +
  '◦\tA 192-bit key (24 bytes) is expanded to 208 bytes.\n' +
  '◦\tA 256-bit key (32 bytes) is expanded to 240 bytes.\n' +
  'The first bytes of the expanded key are all bytes of the original secret key. In order to create succeeding bytes of the expanded key, the following steps must be performed, with iterations numbered from 1. Steps below should be repeated until receiving a desirable number of bytes. To simplify the notation, the length (in bytes) of the original secret key (before expansion) will be denoted as n.\n' +
  '\t\t\tCreating next 4 bytes of the key:\n' +
  '\t\t\tCopying 4 last bytes of the current key to a temporary 4-byte vector.\n' +
  '\t\t\tShifting those four bytes to the left by one position. The leftmost byte should move to the rightmost position.\n' +
  '\t\t\tEach byte in the vector should be replaced by another one, based on Rijndael\'s S-Boxes.\n' +
  '\t\t\tRcon Operation: adding XOR the leftmost byte in the vector to a number 2 raised to the power number equal to (number of current iteration - 1).\n' +
  '\t\t\tAdding XOR the received 4-byte vector to a 4-byte block starting n bytes before the current end of the expanded key and appending the result to the end of the expanded key. At this point, four new key bytes have been created.\n' +
  '\t\t\tCreating next 12 bytes of the key by performing the following steps three times:\n' +
  '\t\t\tCopying 4 last bytes of the current key to a temporary 4-byte vector.\n' +
  '\t\t\tAdding XOR the 4-byte vector to a 4-byte block starting n bytes before the current end of the expanded key and appending the result to the end of the expanded key.\n' +
  '\t\t\tIf the original key is 256 bits long, the following steps should be performed once in order to create 4 new key bytes:\n' +
  '\t\t\tCopying 4 last bytes of the current key to a temporary 4-byte vector.\n' +
  '\t\t\tEach byte in the vector should be replaced by another one, based on Rijndael\'s S-Boxes.\n' +
  '\t\t\tAdding XOR the 4-byte vector to a 4-byte block starting n bytes before the current end of the expanded key and appending the result to the end of the expanded key.\n' +
  '\t\t\tIf the original key is 128 bits long, the following steps should be omitted. If the original key is 192 bits long, the following steps should be performed twice. If the original key is 256 bits long, the following steps should be repeated three times:\n' +
  '\t\t\tCopying 4 last bytes of the current key to a temporary 4-byte vector.\n' +
  '\t\t\tAdding XOR the 4-byte vector to a 4-byte block starting n bytes before the current end of the expanded key and appending the result to the end of the expanded key.\n' +
  '\t\t\tIncreasing the number of iterations by 1.\n' +
  'Decryption\n' +
  'During decryption, the encrypted text is used as input data to the algorithm. The corresponding, inverse operations should be performed, as during encryption:\n' +
  '\t\t\tInverse bytes substitution (ISB).\n' +
  '\t\t\tBytes shifting to the right (ISR).\n' +
  '\t\t\tAdding XOR to a subkey (IAR).\n' +
  '\t\t\tInverse multiplication of columns (IMC).\n' +
  'Subkeys for each iteration should be taken in the reverse order than during encryption.\n' +
  'AES Performance\n' +
  'In order to accelerate the application, one can decide to pre-compute the functions in different rounds and replace them by simple byte substitution based on the calculated tables.\n' +
  'The disadvantage of this approach is that the size of the application will be much larger. It may increase from several to tens of kilobytes, depending on the size of the secret key that is used.\n';

const CryptoJs = require('crypto-js');

export function des_validate_encrypt(word, hasKey, key) {
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!key) {
    return { success: false, message: 'Input your key please.' };
  }
  return { success: true };
}

export function des_validate_decrypt(word, hasKey, key, encryptedText) {
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

export function des_encrypt(message, key) {
  return CryptoJs.DES.encrypt(message, key).toString();
}

export function des_decrypt(message, key) {
  return CryptoJs.DES.decrypt(message, key).toString(CryptoJs.enc.Utf8);
}

export const DES_DESC = 'DES was one of the most popular block symmetric ciphers. It was created in the early 1970s ' +
  'at IBM and adopted as a federal standard by NBS in 1976.'
export const DES_DESC_LONG = 'Usage\n' +
  'DES is one of the most thoroughly examined encryption algorithms. In 1981 it was included in ANSI standards as Data Encryption Algorithm for private sector.\n' +
  'At the beginning of the 21st century, DES started to be considered insecure, mainly due to its relatively short secret key length, what makes it vulnerable to brute force attacks. In 2001 DES cipher was replaced by AES. DES is still one of the most popular cipher.\n' +
  'Algorithm\n' +
  'DES uses the key which is 64-bit long, however only 56 bits are actually used by the algorithm. Every 8th bit of the key is a control one and it can be used for parity control.\n' +
  'In the encryption process, the data is first divided into 64-bit long blocks. Then, each block undergoes the following operations:\n' +
  '\t\t\tInitial permutation rearranges bits in a certain, predefined way. This step does not enhance the security of algorithm. It was introduced to make passing data into encryption machines easier, at the times when the cipher was invented.\n' +
  '\t\t\tThe input data is divided into two 32-bit parts: the left one and the right one.\n' +
  '\t\t\t56 bits are selected from the 64-bit key (Permutation PC-1). They are then divided into two 28-bit parts.\n' +
  '\t\t\tSixteen rounds of the following operations (so called Feistel functions) are then performed:\n' +
  '\t\t\tBoth halves of key are rotated left by one or two bits (specified for each round). Then 48 subkey bits are selected by Permutation PC-2.\n' +
  '\t\t\tThe right half of data is expanded to 48 bits using the Expansion Permutation.\n' +
  '\t\t\tThe expanded half of data is combined using XOR operation with the 48-bit subkey chosen earlier.\n' +
  '\t\t\tThe combined data is divided into eight 6-bit pieces. Each part is then an input to one of the S-Boxes (the first 6-bit part is the input to the first S-Box, the second 6-bit part enters the second S-Box, and so on). The first and the last bits stand for the row, and the rest of bits define the column of an S-Box table. After determining the location in the table, the value is read and converted to binary format. The output from each S-Box is 4-bit long, so the output from all S-Boxes is 32-bit long. Each S-box has a different structure.\n' +
  '\t\t\tThe output bits from S-Boxes are combined, and they undergo P-Box Permutation.\n' +
  '\t\t\tThen, the bits of the changed right side are added to the bits of the left side.\n' +
  '\t\t\tThe modified left half of data becomes a new right half, and the previous right half becomes a new left side.\n' +
  '\t\t\tAfter all sixteen rounds, the left and the right halves of data are combined using the XOR operation.\n' +
  '\t\t\tThe Final Permutation is performed.\n' +
  'During decryption, the same set of operations is performed but in reverse order. The subkeys are also selected in reverse order (compared to encryption).\n' +
  'Weak keys in DES\n' +
  'A weak key in the DES cipher is a key which generates the same subkeys in all the successive rounds of encryption algorithm. There are four known weak keys in DES (expressed in hexadecimal):\n' +
  '◦\t0x00000000000000 (only zeros)\n' +
  '◦\t0xFFFFFFFFFFFFFF (only ones)\n' +
  '◦\t0x0000000FFFFFFF (only zeros and ones)\n' +
  '◦\t0xFFFFFFF0000000 (only ones and zeros)\n' +
  'Semiweak keys in DES\n' +
  'A semiweak key in the DES cipher is a key for which one can find another key that produces the same encrypted ciphertext from the same given plaintext. There are twelve known semiweak keys in DES (expressed in hexadecimal, along with parity bits):\n' +
  '◦\t0x01E001E001F101F1 and 0xE001E001F101F101\n' +
  '◦\t0xFE01FE01FE01FE01 and 0x01FE01FE01FE01FE\n' +
  '◦\t0x1FE01FE00EF10EF1 and 0xE01FE01FF10EF10E\n' +
  '◦\t0xE0FEE0FEF1FEF1FE and 0xFEE0FEE0FEF1FEF1\n' +
  '◦\t0x1F011F010E010E01 and 0x011F011F010E010E\n' +
  '◦\t0xFE1FFE1FFE0EFE0E and 0x1FFE1FFE0EFE0EFE\n' +
  'Initial and Final Permutations in DES\n' +
  'The Initial and Final Permutations have no influence on security. They don\'t use a secret key and can be undone by anybody. They were introduced to make hardware implementation easier in some contexts. A hardware circuit which receives data over an 8-bit bus can accumulate the bits into eight shift registers, which is more efficient (in terms of circuit area) than a single 64-bit register. This process naturally performs the Initial Permutation of DES.\n' +
  'Let\'s assume that somebody is designing a hardware circuit which should do some encryption with DES. The data will be received in blocks of 8 bits. This means that there are 8 lines, each yielding one bit at each clock. A common device for accumulating data is a shift register: the input line plugs into a one-bit register, which itself plugs into another, which plugs into a third register, and so on. At each clock, each register receives the contents from the previous register, and the first register accepts the new bit. Therefore, the contents are shifted.\n' +
  'With an 8-bit bus, 8 shift registers are needed, each receiving 8 bits for every input block. The first register receives bits 1, 9, 17, 25, 33, 41, 49 and 57. The second register receives bits 2, 10, 18, ..., and so on. After eight clocks, eight registers received the complete 64-bit block and it is time to proceed with the DES algorithm itself.\n' +
  'If initial permutation was not used, then the first step of the first round would extract the \'left half\' (32 bits) which, at that point, would consist of the leftmost 4 bits of each of the 8 shift registers. The \'right half\' would also get bits from all the 8 shift registers. If you think of it as wires from the shift registers to the units which use the bits, then you end up with a bunch of wires which heavily cross each other. Crossing is doable but requires some circuit area, which is the expensive resource in hardware designs.\n' +
  'On the other hand, if you consider that the wires must extract the input bits and permute them as per the DES specification, you will find out that there is no crossing anymore. In other words, the accumulation of bits into the shift registers inherently performs a permutation of the bits, which is exactly the initial permutation of DES. By defining that initial permutation, the DES standard says: \'well, now that you have accumulated the bits in eight shift registers, just use them in that order, that\'s fine\'.\n' +
  'The same thing is done again at the end of the algorithm during the Final Permutation.\n' +
  'DES was designed at a time when 8-bit bus were the top of the technology and one thousand transistors were an awfully expensive amount of logic.\n' +
  'Security of DES\n' +
  'DES is considered to be a well-designed and effective algorithm. However, just after its publication, many cryptographers believed that the size of its key is too small. At present, the 56-bit long key can be broken relatively cheaply, by using brute force attacks within a few days.\n' +
  'It is quite easy to attack DES knowing some parts of plaintext. The intruder can try all 256 possible keys. He looks for a key, which used for decryption of an encrypted block of the known plaintext, produces exactly the same plaintext. In practice, it is enough to know two or three blocks of plaintext to be able to determine if the currently testing key which works for them, will be working for other blocks as well. Probability that the found key is incorrect and converts correctly only the known plaintext blocks is negligibly small.\n' +
  'The fastest known attacks on DES use linear cryptanalysis. They require knowing 243 blocks of plaintext and their time complexity is around 239 to 243.\n';

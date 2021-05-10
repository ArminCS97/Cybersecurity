import NodeRSA from 'node-rsa';

export function rsa_validate_encrypt(word, hasKey, key) {
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!key) {
    return { success: false, message: 'Input your key please.' };
  }
  if (key % 8 !== 0) {
    return { success: false, message: 'The key has to be a multiple of 8.' };
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
    return { success: false, message: 'The key has to be a multiple of 8.' };
  }
  if (!encryptedText) {
    return { success: false, message: 'You have to have an encrypted text by this function.' };
  }
  return { success: true };
}

let nodeRsa;

export function rsa_encrypt(message, key) {
  nodeRsa = new NodeRSA({ b: key });
  return nodeRsa.encrypt(message, 'base64');
}


export function rsa_decrypt(message, key) {
  return nodeRsa.decrypt(message, 'utf8');
}

export const RSA_DESC = 'Designed by Ron Rivest, Adi Shamir and Leonard Adleman in 1977 ' +
  'based on the practical difficulty of factoring the product of two large prime numbers.';
export const RSA_DESC_LONG = 'Key Generation\n' +
  'Both RSA keys are generated using the following algorithm:\n' +
  '\t\t\tChoose two different prime numbers, usually they are denoted by p and q. The numbers should be chosen at random and they should be of similar bit-length.\n' +
  '\t\t\tCalculate:    n = p·q\n' +
  '\t\t\tThe number n is used as the modulus for both private and public keys. Its length is the length of the RSA key.\n' +
  '\t\t\tCalculate a value of Euler\'s totient function for n:\n' +
  '\t\t\t    φ(n) = φ(p)·φ(q) = (p − 1)·(q − 1)\n' +
  '\t\t\tChoose an integer e that is larger than 1 and smaller than previously computed value φ(n). The numbers e and φ(n) should be coprime. The number e is used as the public key exponent.\n' +
  '\t\t\tCompute a number d such that:    d·e = 1  (mod φ(n))\n' +
  '\t\t\tThe number d is used as the private key exponent.\n' +
  'The public key consists of the modulus n and the public exponent e. The private key consists of the modulus n and the private exponent d. All numbers related to the private key must be kept secret: both n and d, and three other numbers: p, q and φ(n) which can be used to compute d.\n' +
  'A lot of users can use the same value of e. Its length should be relatively short, because time complexity of encryption depends significantly on the number of bits of e. A prime number 216+1 (thus 65537) is often used as the value of e. One can also use much smaller numbers (for example 3) but they are considered to be less secure in some circumstances.\n' +
  'Each user should possess its own number n (which is computed from the two prime numbers).\n' +
  'Encryption\n' +
  'During encryption one should use a public key (n, e). All messages should be divided into a number of parts. Then, each part should be converted to a number (that must be larger than 0 and smaller than n). In practice, the message should be divided into fragments of the size of a certain number of bits.\n' +
  'Then, every number of the message is raised modulo n to the power e:\n' +
  '    ci = mie  (mod n)\n' +
  'RSA can be used multiple times (with different keys) to encrypt a message. The received ciphertext can be decrypted in any order. The result is always the same. It does not matter in which order the operations have been performed. However, one shouldn\'t encrypt a message in this way more than twice, because of attacks based on the Chinese remainder theorem.\n' +
  'Encryption can be performed by using a private key as well. The procedure is the same, as described above, but the private key (n, d) should be used instead. The receiver will have to use the public key to decrypt the message.\n' +
  'Decryption\n' +
  'During decryption one should use a private key (n, d).\n' +
  'The received ciphertext consists of numbers, which are smaller than n. Each ciphertext number ought to be raised modulo n to the power d:\n' +
  '    mi = cid  (mod n)\n' +
  'The received plaintext numbers should be combined in the correct order into the original plaintext message.\n' +
  'If the message was encrypted by a private key, decryption should be performed by using the corresponding public key. The procedure is the same as the one presented above, but for decryption the public key (n, e) should be used instead.\n' +
  'Message Authentication\n' +
  'RSA can be used to sign messages. A sender should produce a hash value of the message content and then raise it to the power of d (modulo n). Therefore, he should perform the same operations as during ordinary encryption procedure. The encoded hash value should be attached to the message.\n' +
  'The recipient of the message can raise the received encrypted hash value to the power of e (modulo n) and compare the result with a hash value calculated by him. If both values are the same, then the recipient is assured that the message hasn\'t been changed.\n' +
  'Security of RSA\n' +
  'If one used a small exponent e (for example 4) to encrypt a small value m (smaller than n1/e), then a ciphertext number would be smaller than the modulus n. Such a case allows to determine the value of m using ordinary arithmetic operations, which are fast and effective.\n' +
  'To protect against the use of the algorithm for encrypting too small plaintext numbers, one should add random paddings, that would increase the number values. Also, thanks to using random paddings, the same plaintext numbers are encoded by various ciphertext numbers. There are a lot of popular padding schemes, for example OAEP, PKCS#1 or RSA-PSS.\n' +
  'The RSA algorithm is deterministic, thus the cipher is vulnerable to chosen plaintext attacks. It is possible to encrypt a lot of messages using a known public key. Therefore, an attacker can guess a content of captured encrypted messages by comparing them with the messages created by him.\n' +
  'Another feature of this cipher is that a ciphertext of the product of two plaintext numbers is the same as the product of ciphertexts that correspond to those plaintexts.\n' +
  'RSA is generally considered to be a secure cryptosystem. It is used in various applications, protocols and kinds of communication.\n' +
  '\n' +
  'Maths:\n' +
  'Euler\'s totient function (phi function)\n' +
  'The value of Euler\'s totient function for a positive integer n, denoted φ(n), is determined by the number of all positive integers less than or equal to n, that are relatively prime to n.\n' +
  'If n is a positive integer, then φ(n) is equals to the number of such integers k that k is not smaller than 1 and it is not larger than n, and the numbers n and k are coprime.\n' +
  'The totient function is an multiplicative function. This means that if two numbers a and b are relatively prime, then:\n' +
  '    φ(a·b) = φ(a)·φ(b).\n' +
  'Modular exponentiation\n' +
  'Raising a number to the power modulo a positive number is one of the most important operations in modern cryptography. It is described by the general laws of numbers manipulation in modulo arithmetic. Both the base and the exponent are positive integers. The result is also a natural number.\n' +
  'The operation of raising modulo a number to a power may be presented as a sequence of operations which consist of raising to the square and then dividing modulo all the subsequent results.\n' +
  'For example, raising 4 to the power of 9 modulo 7 can be calculated in the following way:\n' +
  '    49 mod 7:     42 mod 7 = 16 mod 7 = 2     44 mod 7 = 22 mod 7 = 4 mod 7 = 4     48 mod 7 = 42 mod 7 = 16 mod 7 = 2     49 mod 7 = (41 mod 7 * 48 mod 7) mod 7 = 4 * 2 mod 7 = 1\n' +
  'As opposed to the common exponentiation, exponentiation in modular arithmetic is difficult and there are no efficient algorithms to perform the reverse operation.\n';

function isLetter(str) {
  return str.length === 1 && str.match(/[a-zA-Z]/i)
}

function isUpperCase(character) {
  if (character === character.toUpperCase()) {
    return true
  }
  if (character === character.toLowerCase()) {
    return false
  }
}

export function vigenere_validate(word, hasKey, key) {
  let letters = /^[A-Za-z]+$/;
  if (hasKey) {
    if (!key) {
      return { success: false, message: 'Input a key please.' };
    }
    if (!key.match(letters)) {
      return {
        success: false,
        message: 'No digits or white spaces allowed for this function.'
      };
    }
  }
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!word.match(letters)) {
    return { success: false, message: 'No digits or white spaces allowed for this function.' };
  }
  return { success: true };
}


export function vigenere_encrypt(message, key) {
  let result = '';

  for (let i = 0, j = 0; i < message.length; i++) {
    const c = message.charAt(i);
    if (isLetter(c)) {
      if (isUpperCase(c)) {
        result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
      } else {
        result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
      }
    } else {
      result += c;
    }
    j = ++j % key.length;
  }
  return result;
}


export function vigenere_decrypt(message, key) {
  let result = ''

  for (let i = 0, j = 0; i < message.length; i++) {
    const c = message.charAt(i)
    if (isLetter(c)) {
      if (isUpperCase(c)) {
        result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
      } else {
        result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
      }
    } else {
      result += c
    }
    j = ++j % key.length
  }
  return result
}

export const VIGENERE_DESC = 'Vigenere Cipher is a method of encrypting alphabetic text. Is a poly-alphabetic' +
  ' substitution system that use a key and a double-entry table.'
export const LONG_DESC_VIGENERE = 'POLYALPHABETIC SUBSTITUTION CIPHERThe cipher was invented by Italian Giovan Battista Bellaso, who described it in 1553 in his book "La cifra del. Sig. Giovan Battista Bellaso". However it is named, due to the wrong widespread belief in the nineteenth century, after the French diplomat and alchemist Blaise de Vigenère, who lived in the sixteenth century.UsageThe Vigenère cipher is quite easy to use and provide relatively good security. It was widely used for a long time until the twentieth century.AlgorithmThe Vigenère cipher is a kind of polyalphabetic substitution cipher. It is about replacing plaintext letters by other letters. The parties have to agree the common shared keyword (which may be also a sentence), which is used during encryption algorithm. They don\'t have to specify all 26 substitutions for all possible letters of the alphabet.During encrypting and decrypting, one should use a table which contains all alphabet letters in the correct order in the first row and then, in subsequent rows, letters shifted to the left by one subsequent position. The table has a Latin name tabula recta and it was used the first time in cryptography by a German monk Johannes Trithemius.\n' +
  'In order to encrypt a message, one should use a secret keyword (or a few words). The keyword is used to choose rows with variously shifted alphabet letters. Subsequent plaintext letters are replaced by subsequent corresponding letters in rows, which are pointed by keyword letters.\n' +
  '\n' +
  'For example, if one choose a word rex as a secret keyword, the first message letter should be encrypted using the row r, the second letter using the row e, the third letter using the row x. Therefore, the first letter should be shifted by 17 positions, the second plaintext letter should be shifted by 4 positions and the third letter should be shifted by 23 alphabet positions. Then, one should use keyword letters from the beginning. The fourth plaintext letter will be encrypted using the row r.\n' +
  '\n' +
  'There is a simple variant of the Vigenère cipher, referred to as Variant Beaufort. Using this variant, one should encrypt the message using the Vigenère decryption method and decrypt the ciphertext using the Vigenère encryption algorithm. One just move letters in the opposite direction than in the original algorithm. This method has nothing in common with the Beaufort cipher so they shouldn\'t be confused.\n' +
  '\n' +
  'Security of the Vigenère cipher\n' +
  'In order to break the Vigenère cipher one should determine a secret key size (the length of keyword or sentence, which were used for encrypting message). Below, there are presented two methods of guessing this length. Both methods base on ciphertext analyzing. They were discovered by Kasiski and Friedman.\n' +
  '\n' +
  'After determining the length of the key, further cryptanalysis is based on frequency analysis of ciphertext letters. Ciphertext letters encrypted with different secret key letters should be analyzed separately. Plaintext letters encrypted used the first secret key letter should be tested separately, plaintext letters encrypted used the second secret key letter should be also tested separately and so on. Knowing the key size, the main task is to break a few texts, separately encrypted using the Caesar cipher.\n' +
  '\n' +
  'Kasiski examination\n' +
  'This method of determining the secret key length was created by the German soldier, archaeologist and cryptographer Friedrich Kasiski in the nineteenth century. One should search through ciphertext looking for sequences of the same characters. Finding such sequences may mean that they are created by encoding the same parts of plaintext using the same parts of secret key.\n' +
  '\n' +
  'For example, the principle can be noticed during encryption following plaintext letters using following secret key letters:\n' +
  '\n' +
  '    Key:\tNATURAENATURAENATURAENATURAE\n' +
  '    Plaintext:\tALIUDESTFACEREALIUDESTDICERE\n' +
  '    Ciphertext:\tNLBOUEWGFTWVRINLBOUEWGDBWVRI\n' +
  '\n' +
  'Based on analysis and measurement distances between beginnings of repeated sequences (which in the example is equal to 14 characters), one can assume that the encrypting key has one of the following lengths: 1, 2, 7 or 14 characters.\n' +
  '\n' +
  'If during ciphertext analysis one found more sequences of the same characters, then one could assume that the secret key has the length equal to one of the numbers suggested by different repeated sequences.\n' +
  '\n' +
  'Sequences of the same ciphertext characters may be also caused by random mixing of various plaintext and secret key letters. The more repeated sequences in the ciphertext will be found, the more likely they are caused by encrypting the same parts of plaintext using the same secret key letters (and it is not just a random coincidence).\n' +
  '\n' +
  'Friedman test\n' +
  'William Friedman was a cryptographer in the US army. He elaborated a method of guessing the keyword length for the Vigenère cipher in the third decade of the twentieth century. It is based on calculating an index of coincidence and one should compare ciphertext letters with the same letters shifted by various numbers of letters.'

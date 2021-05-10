const CYR = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у',
  'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const LAT = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const PUNCT = ['.', ',', ';', '/', '\\', '?', '!', '-', '(', ')', '[', ']', '"', "#", "$", "%", "^", "&", "*", "@"];

function parseText(txt) {
  PUNCT.forEach(p => {
    if (txt.includes(p)) {
      p = p.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); // escape all special characters (? => \\?)
      let pReg = new RegExp(p, "g");
      txt = txt.replace(pReg, "");
    }
  });
  txt = txt.toLowerCase().trim().replace(/\s/g, "ß"); // identifier for whitespaces
  return txt;
}

export function vernam_validate(word, hasKey, key) {
  if (hasKey) {
    if (!key) {
      return { success: false, message: 'Input a key please.' };
    }
  }
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  const keyValue = parseText(key);
  const txtValue = parseText(word);
  let keyAlphabet;
  let txtAlphabet;
  if (LAT.includes(keyValue.charAt(0))) {
    keyAlphabet = LAT;
  } else {
    keyAlphabet = CYR;
  }
  if (LAT.includes(txtValue.charAt(0))) {
    txtAlphabet = LAT;
  } else {
    txtAlphabet = CYR;
  }
  for (const char of keyValue) {
    if (!keyAlphabet.includes(char) && char !== 'ß') {
      return { success: false, message: 'Please, use Lower Case Latin or Russian letters for key.' };
    }
    if (!isNaN(parseInt(char, 10))) {
      return { success: false, message: 'Cannot encode numbers for key.' };
    }
  }
  for (const char of txtValue) {
    if (!txtAlphabet.includes(char) && char !== 'ß') {
      return { success: false, message: 'Please, use Lower Case Latin or Russian letters for text.' }
    }
    if (!isNaN(parseInt(char, 10))) {
      return { success: false, message: 'Cannot encode numbers for text.' };
    }
  }
  if (keyAlphabet !== txtAlphabet) {
    return { success: false, message: 'Key and text alphabets don\'t match.' };
  }
  return { success: true };
}

export function vernam_encrypt(plaintext, key) {
  let txt = parseText(plaintext);
  let cipher = [];
  let alphabet;
  if (key.length < txt.length) {
    key = key.repeat(Math.ceil(txt.length / key.length)).slice(0, txt.length); // fit key to text length
  }
  if (LAT.includes(txt.charAt(0))) {
    alphabet = LAT;
  } else {
    alphabet = CYR;
  }
  for (let i = 0; i < txt.length; i++) {
    if (txt.charAt(i) === "ß") { // ignore parsed whitespace identifiers (e.g. helloßworld)
      cipher.push("ß");
    } else {
      let txtChar = txt.charAt(i);
      let txtIndex = alphabet.indexOf(txtChar);
      let keyChar = key.charAt(i);
      let keyIndex = alphabet.indexOf(keyChar);
      let sumIndex = txtIndex + keyIndex;
      if (sumIndex >= alphabet.length) { // cycle to the beginning when out of range
        sumIndex -= alphabet.length;
      }
      let sumChar = alphabet[sumIndex];
      cipher.push(sumChar);
    }
  }
  cipher = cipher.join('');
  return cipher;
}

export function vernam_decrypt(word, key) {
  let cip = parseText(word);
  let alphabet;
  let plaintext = '';
  if (key.length < cip.length) {
    key = key.repeat(Math.ceil(cip.length / key.length)).slice(0, cip.length); // fit key to text length
  }
  if (LAT.includes(cip.charAt(0))) {
    alphabet = LAT;
  } else {
    alphabet = CYR;
  }
  for (let i = 0; i < cip.length; i++) {
    if (cip.charAt(i) === "ß") {
      plaintext.concat(" ");
    } else {
      let cipChar = cip.charAt(i);
      let cipIndex = alphabet.indexOf(cipChar);
      let keyChar = key.charAt(i);
      let keyIndex = alphabet.indexOf(keyChar);
      let sumIndex = cipIndex - keyIndex;
      if (sumIndex < 0) { // cycle to the end when out of range
        sumIndex += alphabet.length;
      }
      let sumChar = alphabet[sumIndex];
      plaintext = plaintext.concat(sumChar);
    }
  }
  return plaintext;
}

export const VERNAM_DESC = "The Vernam Cipher is an algorithm invented in 1917 to encrypt teletype (TTY) messages." +
  "a symmetric cipher patented July 22, 1919";

export const VERNAM_DESC_LONG = 'Vernam Cipher – It uses a simple algorithm:\n' +
  '1\tTreat each plain text character as a number in increasing sequence (A=0, B=1, …Z=25).\n' +
  '2\tDo the same for each character of key.\n' +
  '3\tAdd each number corresponding to plain text alphabet and key.\n' +
  '4\tIf sum produced greater than 26, subtract 26 form it.\n' +
  '5\tTranslate each number of sum back to alphabet, it gives our cipher text.\n';

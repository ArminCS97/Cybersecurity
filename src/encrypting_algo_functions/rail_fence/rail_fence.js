export function rail_fence_validate(message) {
  return { success: true };
}

export function rail_fence_encrypt(message) {
  let a = '';
  let b = '';
  let c = '';
  let flag_a = 0;
  for (let i = 0; i < message.length; i = i + 4) {
    if (flag_a === 0) {
      a += message.charAt(i);
      b += message.charAt(i + 1);
      c += message.charAt(i + 2);
      b += message.charAt(i + 3);
      flag_a = 1;
    } else {
      a += message.charAt(i);
      b += message.charAt(i + 1);
      i = i - 2;
      flag_a = 0;
    }
  }
  return (a + b + c);
}

export function rail_fence_decrypt(cipher) {
  let message = '';
  let a = '';
  let b = '';
  let c = '';
  let length = cipher.length;
  let multiply = parseInt(length / 6);
  if (length >= 6) {
    a = cipher.slice(0, (2 * multiply));
    b = cipher.slice((2 * multiply), (5 * multiply));
    c = cipher.slice((5 * multiply));
  }
  if ((length % 6) === 1) {
    a = cipher.slice(0, (2 * multiply) + 1);
    b = cipher.slice((2 * multiply) + 1, (5 * multiply) + 1);
    c = cipher.slice((5 * multiply) + 1);
  } else if ((length % 6) === 2) {
    a = cipher.slice(0, (2 * multiply) + 1);
    b = cipher.slice((2 * multiply) + 1, (5 * multiply) + 2);
    c = cipher.slice((5 * multiply) + 3);
  } else if ((length % 6) === 3) {
    a = cipher.slice(0, (2 * multiply) + 1);
    b = cipher.slice((2 * multiply) + 1, (5 * multiply) + 2);
    c = cipher.slice((5 * multiply) + 2);
  } else if ((length % 6) === 4) {
    a = cipher.slice(0, (2 * multiply) + 1);
    b = cipher.slice((2 * multiply) + 1, (5 * multiply) + 3);
    c = cipher.slice((5 * multiply) + 3);
  } else if ((length % 6) === 5) {
    a = cipher.slice(0, (2 * multiply) + 2);
    b = cipher.slice((2 * multiply) + 2, (5 * multiply) + 4);
    c = cipher.slice((5 * multiply) + 4);
  }
  let a_counter = 0;
  let b_counter = 0;
  let c_counter = 0;

  for (let i = 0; i < length - 1; i += 6) {
    message += a.charAt(a_counter) + b.charAt(b_counter) + c.charAt(c_counter) + b.charAt(b_counter + 1) +
      a.charAt(a_counter + 1) + b.charAt(b_counter + 2);
    a_counter += 2;
    b_counter += 3;
    c_counter++;
  }
  if ((length % 6) === 1) {
    message += a.charAt(a_counter);
  } else if ((length % 6) === 2) {
    message += a.charAt(a_counter) + b.charAt(b_counter);
  } else if ((length % 6) === 3) {
    message += a.charAt(a_counter) + b.charAt(b_counter) + c.charAt(c_counter);
  } else if ((length % 6) === 4) {
    message += a.charAt(a_counter) + b.charAt(b_counter) + c.charAt(c_counter) + b.charAt(b_counter + 1);
  } else if ((length % 6) === 5) {
    message += a.charAt(a_counter) + b.charAt(b_counter) + c.charAt(c_counter) + b.charAt(b_counter + 1) +
      a.charAt(a_counter + 1);
  }
  return message;
}

export const RAIL_FENCE_DESC = 'The rail_fence is a transposition cipher, which rearranges the plaintext letters by drawing ' +
  'them in a way that they form a shape of the rails of an imaginary fence.';

export const RAIL_FENCE_DESC_LONG = 'Usage\n' +
  'The Rail Fence Cipher was invented in ancient times. It was used by the Greeks, who created a special tool, called scytale, to make message encryption and decryption easier. Currently, it is usually used with a piece of paper. The letters are arranged in a way which is similar to the shape of the top edge of the rail fence.\n' +
  'Algorithm\n' +
  'To encrypt the message, the letters should be written in a zigzag pattern, going downwards and upwards between the levels of the top and bottom imaginary rails. The shape that is formed by the letters is similar to the shape of the top edge of the rail fence.\n' +
  'Next, all the letters should be read off and concatenated, to produce one line of ciphertext. The letters should be read in rows, usually from the top row down to the bottom one.\n' +
  '\n' +
  'The secret key is the number of levels in the rail. It is also a number of rows of letters that are created during encryption. This number cannot be very big, so the number of possible keys is quite limited.\n' +
  'For example, let us encrypt a name of one of the countries in Europe: The United Kingdom. Let\'s assume that the secret key is 3, so three levels of rails will be produced.\n' +
  'First, we will remove the empty spaces, and encrypt only the capitalized letters:\n' +
  'THEUNITEDKINGDOM\n' +
  'Next, the plaintext letters will form the shape of the fence:\n' +
  'T\t.\t.\t.\tN\t.\t.\t.\tD\t.\t.\t.\tG\t.\t.\t.\n' +
  '.\tH\t.\tU\t.\tI\t.\tE\t.\tK\t.\tN\t.\tD\t.\tM\n' +
  '.\t.\tE\t.\t.\t.\tT\t.\t.\t.\tI\t.\t.\t.\tO\t.\n' +
  'Then, the letters should be read row by row, starting from the top one. Finally, they ought to be concatenated to form one ciphertext message. In our example, the calculated ciphertext sequence would be:\n' +
  'TNDGHUIEKNDMETIO\n' +
  'To decrypt the message, the receiver should know the secret key, that is the number of levels of the rail. Based on the number of rows and the ciphertext length, it is possible to reconstruct the grid and fill it with letters in the right order (that is, in the same way as used by the sender during encryption).\n';

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

export const RAIL_FENCE_DESC_LONG = '';

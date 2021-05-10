import ALPHABET from './params';

const PRIME_NUMBER1 = 2147483647
const PRIME_NUMBER2 = 6700417

export function affine_validate(word) {
  let letters = /^[A-Za-z]+$/;
  if (!word) {
    return { success: false, message: 'Input your word please.' };
  }
  if (!word.match(letters)) {
    return { success: false, message: 'No digits or white spaces allowed for this function.' };
  }
  return { success: true };
}


export function affine_encrypt(word) {
  for (let i = 0; i < word.length; i++) {
    let alphaIndex = ALPHABET.indexOf(word[i]);
    let troublesome = (PRIME_NUMBER1 * alphaIndex + PRIME_NUMBER2) % ALPHABET.length;
    word = word.substring(0, i) + ALPHABET[troublesome] + word.substring(i + 1);
  }
  return word;
}

export function affine_decrypt(word) {
  for (let i = 0; i < word.length; i++) {
    const a = PRIME_NUMBER1 % ALPHABET.length;
    //Bruteforce the modular invert of the a

    let invert = 0;
    for (let j = 1; j < ALPHABET.length; j++) {
      if ((a * j) % ALPHABET.length === 1)
        invert = j;
    }
    let alphaIndex = ALPHABET.indexOf(word[i]);

    let troublesome = (invert * (alphaIndex - PRIME_NUMBER2)) % ALPHABET.length;
    if (troublesome < 0)
      troublesome += ALPHABET.length;
    word = word.substring(0, i) + ALPHABET[troublesome] + word.substring(i + 1);
  }
  return word;
}


export const DESC_AFFINE = 'The affine cipher is a type of monoalphabetic substitution cipher, where each letter in an ' +
  'alphabet is mapped to its numeric equivalent'
export const LONG_DESC_AFFINE = 'In Euclidean geometry, an affine transformation, or an affinity (from the Latin, ' +
  'affinis, "connected with"), is a geometric transformation that preserves lines and parallelism (but not necessarily ' +
  'distances and angles).More generally, an affine transformation is an automorphism of an affine space (Euclidean ' +
  'spaces are specific affine spaces), that is, a function which maps an affine space onto itself while preserving both the dimension of any affine subspaces (meaning that it sends points to points, lines to lines, planes to planes, and so on) and the ratios of the lengths of parallel line segments. Consequently, sets of parallel affine subspaces remain parallel after an affine transformation. An affine transformation does not necessarily preserve angles between lines or distances between points, though it does preserve ratios of distances between points lying on a straight line.If X is the point set of an affine space, then every affine transformation on X can be represented as the composition of a linear transformation on X and a translation of X. Unlike a purely linear transformation, an affine transformation need not preserve the origin of the affine space. Thus, every linear transformation is affine, but not every affine transformation is linear.Examples of affine transformations include translation, scaling, homothety, similarity, reflection, rotation, shear mapping, and compositions of them in any combination and sequence.Viewing an affine space as the complement of a hyperplane at infinity of a projective space, the affine transformations are the projective transformations of that projective space that leave the hyperplane at infinity invariant, restricted to the complement of that hyperplane.A generalization of an affine transformation is an affine map[1] (or affine homomorphism or affine mapping) between two (potentially different) affine spaces over the same field k. Let (X, V, k) and (Z, W, k) be two affine spaces with X and Z the point sets and V and W the respective associated vector spaces over the field k. A map f: X → Z is an affine map if there exists a linear map mf : V → W such that mf (x − y) = f (x) − f (y) for all x, y in X.Let (X, V, k) be an affine space of dimension at least two, with X the point set and V the associated vector space over the field k. A semiaffine transformation f of X is a bijection of X onto itself satisfying:[3]\n' +
  '\n' +
  'If S is a d-dimensional affine subspace of X, f (S) is also a d-dimensional affine subspace of X.\n' +
  'If S and T are parallel affine subspaces of X, then f (S) || f (T).\n' +
  'These two conditions express what is precisely meant by the expression that "f preserves parallelism".\n' +
  '\n' +
  'These conditions are not independent as the second follows from the first.[4] Furthermore, if the field k has at least three elements, the first condition can be simplified to: f is a collineation, that is, it maps lines to lines.[5]\n' +
  '\n' +
  'If the dimension of the affine space (X, V, k) is at least two, then an affine transformation is a semiaffine transformation f that satisfies the condition: If x ≠ y and p ≠ q are points of X such that the line segments xy and pq are parallel, then'

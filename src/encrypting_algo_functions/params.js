const ALPHABET_LETTERS = 'a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z';
let ALPHABET = ALPHABET_LETTERS.toUpperCase().split('-');
ALPHABET = ALPHABET.concat(ALPHABET_LETTERS.split('-'));

export default ALPHABET;

import { DESC_CAESAR } from './encrypting_algo_functions/caesar';
import { DESC_AFFINE } from './encrypting_algo_functions/affine';
import { SALT_DESC } from './encrypting_algo_functions/salt';
import { VIGENERE_DESC } from './encrypting_algo_functions/vigenere';
import affineLogo from '../src/resources/Affine.svg';
import ceaserLogo from '../src/resources/Ceaser.svg';
import saltLogo from '../src/resources/Salt.svg';
import vigenereLogo from '../src/resources/Vigenere.svg'

// The function names must be unique.
export const FUNCTION_NAMES = [
  { name: 'cesar', desc: DESC_CAESAR, logo: ceaserLogo },
  { name: 'affine', desc: DESC_AFFINE, logo: affineLogo },
  { name: 'salt cipher', desc: SALT_DESC, logo: saltLogo },
  { name: 'vigenere', desc: VIGENERE_DESC, logo: vigenereLogo }
];

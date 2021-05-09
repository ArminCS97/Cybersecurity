import { DESC_CAESAR } from './encrypting_algo_functions/caesar';
import { DESC_AFFINE } from './encrypting_algo_functions/affine';
import { SALT_DESC } from './encrypting_algo_functions/salt';
import { VIGENERE_DESC } from './encrypting_algo_functions/vigenere';
import affineLogo from '../src/resources/Affine.svg';
import ceaserLogo from '../src/resources/Ceaser.svg';
import saltLogo from '../src/resources/Salt.svg';
import vigenereLogo from '../src/resources/Vigenere.svg';
import vernemLogo from '../src/resources/vernam.svg';
import rsaLogo from '../src/resources/RSA.svg';
import aesLogo from '../src/resources/AES.svg';
import { VERNAM_DESC } from './encrypting_algo_functions/vernam/vernam_cipher';
import { RSA_DESC } from './encrypting_algo_functions/rsa';
import { AES_DESC } from './encrypting_algo_functions/aes';
import { RAIL_FENCE_DESC } from "./encrypting_algo_functions/rail_fence/rail_fence";

// The function names must be unique.
export const FUNCTION_NAMES = [
  { name: 'cesar', desc: DESC_CAESAR, logo: ceaserLogo },
  { name: 'affine', desc: DESC_AFFINE, logo: affineLogo },
  { name: 'salt cipher', desc: SALT_DESC, logo: saltLogo },
  { name: 'vigenere', desc: VIGENERE_DESC, logo: vigenereLogo },
  { name: 'vernam', desc: VERNAM_DESC, logo: vernemLogo },
  { name: 'RSA', desc: RSA_DESC, logo: rsaLogo },
  { name: 'AES', desc: AES_DESC, logo: aesLogo },
  { name: 'rail fence', desc: RAIL_FENCE_DESC, logo: aesLogo }
];

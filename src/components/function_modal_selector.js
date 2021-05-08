import React from 'react';
import EncryptionAndDecryptionModal from './encryption_and_decryption_modal';
import { caesar_validate, caesar_decrypt, caesar_encrypt, LONG_DESC_CAESAR } from '../encrypting_algo_functions/caesar';
import { affine_decrypt, affine_encrypt, affine_validate, LONG_DESC_AFFINE } from '../encrypting_algo_functions/affine';
import { LONG_DESC_SALT, salt_cipher_validate, salt_decrypt, salt_encrypt } from '../encrypting_algo_functions/salt';
import {
  LONG_DESC_VIGENERE,
  vigenere_decrypt,
  vigenere_encrypt,
  vigenere_validate
} from '../encrypting_algo_functions/vigenere';
import affineLogo from '../resources/Affine.svg';
import ceaserLogo from '../resources/Ceaser.svg';
import saltLogo from '../resources/Salt.svg';
import vigenereLogo from '../resources/Vigenere.svg';

const FunctionModalSelector = (props) => {
  const { functionName, isOpen, finish } = props;
  const commonProps = { isOpen: isOpen, functionName: functionName, finish: finish };

  if (!functionName) return null;
  switch (functionName) {
    case 'cesar':
      return (
        <EncryptionAndDecryptionModal {...commonProps}
          decryptor={caesar_decrypt} encryptor={caesar_encrypt} encryptValidator={caesar_validate}
          decryptValidator={caesar_validate} logo={ceaserLogo} longDesc={LONG_DESC_CAESAR} />
      );
    case 'affine':
      return (
        <EncryptionAndDecryptionModal {...commonProps}
          decryptor={affine_decrypt} encryptor={affine_encrypt} encryptValidator={affine_validate}
          decryptValidator={affine_validate} logo={affineLogo} longDesc={LONG_DESC_AFFINE} />
      );
    case 'salt cipher':
      return (
        <EncryptionAndDecryptionModal {...commonProps}
          decryptor={salt_decrypt} encryptor={salt_encrypt} encryptValidator={salt_cipher_validate}
          decryptVali dator={salt_cipher_validate} logo={saltLogo} longDesc={LONG_DESC_SALT} />
      );
    case 'vigenere':
      return (
        <EncryptionAndDecryptionModal {...commonProps} hasKey
          decryptor={vigenere_decrypt} encryptor={vigenere_encrypt} encryptValidator={vigenere_validate}
          decryptValidator={vigenere_validate} logo={vigenereLogo} longDesc={LONG_DESC_VIGENERE} />
      );
    default:
      throw new Error('Unhandled functionName type ' + functionName);
  }
}

export default FunctionModalSelector;

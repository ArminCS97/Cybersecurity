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
import {
  vernam_decrypt,
  VERNAM_DESC_LONG,
  vernam_encrypt, vernam_validate
} from '../encrypting_algo_functions/vernam/vernam_cipher';
import vernamLogo from '../resources/vernam.svg';
import {
  rsa_decrypt,
  rsa_encrypt,
  rsa_validate_decrypt,
  rsa_validate_encrypt
} from '../encrypting_algo_functions/rsa';
import {
  aes_decrypt,
  AES_DESC_LONG,
  aes_encrypt,
  aes_validate_decrypt,
  aes_validate_encrypt
} from "../encrypting_algo_functions/aes";
import {
  rail_fence_decrypt,
  rail_fence_encrypt,
  rail_fence_validate
} from "../encrypting_algo_functions/rail_fence/rail_fence";

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
    case 'vernam':
      return (
        <EncryptionAndDecryptionModal {...commonProps} hasKey
          decryptor={vernam_decrypt} encryptor={vernam_encrypt} encryptValidator={vernam_validate}
          decryptValidator={vigenere_validate} logo={vernamLogo} longDesc={VERNAM_DESC_LONG}
        />
      );
    case 'RSA':
      return (
        <EncryptionAndDecryptionModal {...commonProps}
          decryptor={rsa_decrypt} encryptor={rsa_encrypt} encryptValidator={rsa_validate_encrypt}
          decryptValidator={rsa_validate_decrypt} logo={vernamLogo} longDesc={VERNAM_DESC_LONG}
        />
      );
    case 'AES':
      return (
        <EncryptionAndDecryptionModal {...commonProps} hasKey
          decryptor={aes_decrypt} encryptor={aes_encrypt} encryptValidator={aes_validate_encrypt}
          decryptValidator={aes_validate_decrypt} logo={vernamLogo} longDesc={AES_DESC_LONG}
        />
      );
    case 'rail fence':
      return (
        <EncryptionAndDecryptionModal {...commonProps}
          decryptor={rail_fence_decrypt} encryptor={rail_fence_encrypt} encryptValidator={rail_fence_validate}
          decryptValidator={rail_fence_validate} logo={vernamLogo} longDesc={AES_DESC_LONG}
        />
      );
    default:
      throw new Error('Unhandled functionName type ' + functionName);
  }
}

export default FunctionModalSelector;

import React, { useReducer, useCallback, useRef } from 'react';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import styled from 'styled-components';
import modalBackground from '../resources/background_for_modal.png';
import { RECTANGLE_HEIGHT, MODAL_HEIGHT, MODAL_WIDTH, POPUP_STYLES, RECTANGLE_WIDTH } from './ui_params';
import { Popup } from 'semantic-ui-react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'input-to-encrypt-text':
      return { ...state, toEncryptText: action.text, errorMessage: null, encryptedText: '' };
    case 'input-to-decrypt-text':
      return { ...state, toDecryptText: action.text, errorMessage: null, decryptedText: '' };
    case 'validation-error':
      return { ...state, errorMessage: action.message, encryptedText: '', decryptedText: '' };
    case 'request-encrypted-text':
      return { ...state, encryptedText: action.encryptor(state.toEncryptText, state.key) };
    case 'request-decrypted-text':
      return { ...state, decryptedText: action.decryptor(state.toDecryptText, state.key) };
    case 'input-key':
      return { ...state, key: action.key, errorMessage: null };
    default:
      throw new Error('Unhandled action type inside modal reducer ' + action.type);
  }
};

const EncryptionAndDecryptionModal = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    errorMessage: null,
    toEncryptText: '',
    toDecryptText: '',
    encryptedText: '',
    decryptedText: '',
    key: ''
  });
  const {
    isOpen,
    decryptor,
    encryptor,
    encryptValidator,
    decryptValidator,
    functionName,
    finish,
    hasKey,
    logo,
    longDesc
  } = props;
  const { errorMessage, toEncryptText, toDecryptText, encryptedText, decryptedText, key } = state;

  const topModal = useRef(null);
  const scrollToTop = useCallback(() => {
    if (topModal.current) topModal.current.parentNode.scrollTop = 0;
  }, [topModal]);

  const requestEncrypt = useCallback(() => {
    const result = encryptValidator(toEncryptText, hasKey, key);
    if (!result.success) {
      scrollToTop();
      dispatch({ type: 'validation-error', message: result.message });
    } else {
      dispatch({ type: 'request-encrypted-text', encryptor: encryptor });
    }
  }, [encryptValidator, toEncryptText, scrollToTop, encryptor, key, hasKey]);

  const requestDecrypt = useCallback(() => {
    const result = decryptValidator(toDecryptText, hasKey, key, encryptedText);
    if (!result.success) {
      scrollToTop();
      dispatch({ type: 'validation-error', message: result.message });
    } else {
      dispatch({ type: 'request-decrypted-text', decryptor: decryptor });
    }
  }, [decryptValidator, toDecryptText, scrollToTop, decryptor, key, hasKey, encryptedText]);

  const inputToEncryptText = useCallback(e => dispatch({
    type: 'input-to-encrypt-text', text: e.target.value
  }), []);

  const inputToDecryptText = useCallback(e => dispatch({
    type: 'input-to-decrypt-text', text: e.target.value
  }), []);

  const setKey = useCallback(e => dispatch({
    type: 'input-key', key: e.target.value
  }), []);

  return (
    <Modal open={isOpen} onClose={finish} closeOnDocumentClick={false} closeOnDimmerClick={false}
      closeIcon closeOnEscape={false} size='large'>
      <ModalWrapper>
        <Modal.Content style={{ display: 'flex' }}>
          <div style={{ width: MODAL_WIDTH, marginTop: '10px' }}>
            <div ref={topModal} />
            <Form {...{ error: !!errorMessage }} unstackable>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              {hasKey &&
              <FieldSeparator>
                <KeyTextInput placeholder='Input a key...' value={key} onChange={setKey} />
              </FieldSeparator>}
              <FieldSeparator>
                <Form.Field>
                  <TextAreaInput placeholder='Input text to Encrypt...' value={toEncryptText}
                    onChange={inputToEncryptText} />
                </Form.Field>
                <Popup on='click' position='right center' size='huge' basic style={{ padding: 0, marginTop: '12px' }}
                  trigger={<Button onClick={requestEncrypt} background='#8481C8'>Encrypt</Button>}>
                  {
                    encryptedText && toEncryptText &&
                    <Popup.Content style={POPUP_STYLES}>
                      <p>{encryptedText}</p>
                    </Popup.Content>
                  }
                </Popup>
              </FieldSeparator>
              <FieldSeparator>
                <Form.Field>
                  <TextAreaInput placeholder='Input text to Decrypt...' value={toDecryptText}
                    onChange={inputToDecryptText} />
                </Form.Field>
                <Popup on='click' position='right center' size='huge' basic style={{ padding: 0, marginTop: '12px' }}
                  trigger={<Button onClick={requestDecrypt} background='#8481C8'>Decrypt</Button>}>
                  {
                    decryptedText && toDecryptText &&
                    <Popup.Content style={POPUP_STYLES}>
                      <p>{decryptedText}</p>
                    </Popup.Content>
                  }
                </Popup>
              </FieldSeparator>
            </Form>
          </div>
          <Desc logo={logo} functionName={functionName} longDesc={longDesc}
            modalHasExtraField={functionName === 'vigenere'} />
        </Modal.Content>
      </ModalWrapper>
    </Modal>
  );
};

const ModalWrapper = styled.div`
  padding-left: 30px;
  background-image: url("${modalBackground}");
`;

const FieldSeparator = styled.div`
  margin-top: 70px;
`;

const ErrorMessage = styled.p`
  border: darkred 2px solid;
  display: flex;
  height: 70px;
  align-items: center;
  width: 95%;
  padding-left: 15px;
  font-size: 1.8em;
  color: red;
`;

const Desc = (props) => (
  <DescWrapper modalHasExtraField={props.modalHasExtraField}>
    <DescAndFunctionWrapper>
      <DescLogo src={props.logo} alt={props.functionName} />
      <FunctionName>{props.functionName}</FunctionName>
    </DescAndFunctionWrapper>
    <Description>{props.longDesc}</Description>
  </DescWrapper>
);

const Description = styled.p`
  margin: 18px;
  font-size: 2.1em;
  line-height: 1.5em;
`;

const DescAndFunctionWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const FunctionName = styled.p`
  font-size: 2.3em;
  text-transform: capitalize;
  padding-left: 25px;
  font-weight: 700;
`;

const DescWrapper = styled.div`
  background: aliceblue;
  width: calc(${MODAL_WIDTH} - 5vw);
  height: ${props => props.modalHasExtraField ? '44vw' : MODAL_HEIGHT};
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 20px;
    height: 2px !important;
  }

  &::-webkit-scrollbar-track {
    background: #AEC2E5;
  }

  &::-webkit-scrollbar-thumb {
    background: #5C3FAB;
    border-right: none;
    border-left: none;
  }

  &::-webkit-scrollbar-track-piece:start {
    margin-top: 10px;
  }

  &::-webkit-scrollbar-track-piece:end {
    margin-bottom: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #5D42AD;
  }
`;

const DescLogo = styled.img`
  width: calc(${RECTANGLE_WIDTH} - 50px);
  height: calc(${RECTANGLE_HEIGHT} - 50px);
  margin-left: 30px;
  margin-top: 30px;
`;

const Button = styled.button`
  border-radius: 15px;
  height: 50px;
  width: 175px;
  background: ${props => props.background};
  color: #DBECFF;
  font-size: 1.5em;
  margin-top: 16px;
  &:hover {
    box-shadow: dimgrey 10px 10px 10px;
  }
`;

const TextAreaInput = styled.textarea`
  width: 30vw !important;
  background: #B2C5E6 !important;
  height: 130px !important;
  border-radius: 15px !important;
  border: 2px #B2C5E6 solid !important;
  font-size: 1.7em !important;

  &::placeholder {
    color: #F2FEFF !important;
    font-size: 1.2em;
    font-style: italic;
  }
`;

const KeyTextInput = styled.input`
  width: 30vw !important;
  background: #B2C5E6 !important;
  height: 50px !important;
  border-radius: 15px !important;
  border: 2px #B2C5E6 solid !important;
  font-size: 1.7em !important;

  &::placeholder {
    color: #F2FEFF !important;
    font-size: 1.2em;
    font-style: italic;
  }
`;

export default EncryptionAndDecryptionModal;

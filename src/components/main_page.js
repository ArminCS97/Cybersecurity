import React, { useReducer, useCallback } from 'react';
import { FUNCTION_NAMES } from '../params';
import FunctionModalSelector from './function_modal_selector';
import styled from 'styled-components';
import FunctionField from './function_filed';
import background from '../resources/background_big.jpg';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-function-name':
      return { ...state, functionName: action.functionName, modalOpen: true };
    case 'finish-modal':
      return { ...state, modalOpen: false, functionName: '' };
    default:
      throw new Error('Unhandled action type in MainPage reducer ' + action.type);
  }
};

const MainPage = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    errorMessage: null,
    functionName: ''
  });

  const { modalOpen, functionName } = state;

  const setFunctionName = useCallback(name => dispatch({
    type: 'set-function-name', functionName: name
  }), []);

  const finishModal = useCallback(() => dispatch({
    type: 'finish-modal'
  }), []);

  return (
    <Wrapper>
      <Header>HEAM</Header>
      <Label>Select one of these functions to start:</Label>
      <FunctionsWrapper>
        {FUNCTION_NAMES.map(f =>
          <FunctionWrapper key={f.name} onClick={() => setFunctionName(f.name)}>
            <FunctionField name={f.name} logo={f.logo} desc={f.desc} />
          </FunctionWrapper>
        )}
      </FunctionsWrapper>
      <FunctionModalSelector isOpen={modalOpen} functionName={functionName} finish={finishModal} />
    </Wrapper>
  );
};

const FunctionWrapper = styled.div`
  margin: 40px;
`;

const Wrapper = styled.div`
  height: 1000px;
  width: 100vw;
  text-align: center;
  background-image: url(${background});
  background-repeat: no-repeat;
`;

const FunctionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  padding-left: 80px;
`;

const Label = styled.div`
  margin-bottom: 60px;
  font-weight: 700;
  font-size: 2.1em;
  margin-top: 50px;
  font-style: italic;
  color: #000;
`;

const Header = styled.h1`
  font-size: 3em;
  margin: 32px;
`;

export default MainPage;

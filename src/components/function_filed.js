import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import background from '../resources/Background_small.png';
import { TRANSITION_DURATION, RECTANGLE_HEIGHT, INCREASE_WHEN_HOVER, RECTANGLE_WIDTH } from './ui_params';

const FunctionField = (props) => {
  const [showDesc, setShowDesc] = useState(false);
  const hoverOnOneFunction = useCallback(() => setShowDesc(true), []);
  const mouseLeaveFunction = useCallback(() => setShowDesc(false), []);

  return (
    <RectangularPage onMouseLeave={mouseLeaveFunction} onMouseOver={hoverOnOneFunction}>
      <Logo src={props.logo} alt={props.name} />
      {showDesc === true
        ?
          <div>
            <Title>{props.name}</Title>
            <Text>{props.desc}</Text>
          </div>
        :
          <Title>{props.name}</Title>
      }
    </RectangularPage>
  );
}

const Logo = styled.img`
  display: block;
  height: calc(${RECTANGLE_HEIGHT} - ${INCREASE_WHEN_HOVER});
  width: calc(${RECTANGLE_WIDTH} - ${INCREASE_WHEN_HOVER});
`;

const Title = styled.h3`
  text-transform: capitalize;
  font-size: 1.8em;
  font-weight: 700;
`;

const Text = styled.p`
  font-family: "Helvetica Neue", "Lucida Grande", Helvetica, Arial, Verdana, sans-serif;
  font-size: 1.5em;
  margin-top: .5em; 
  color: #000;
  font-weight: 700;
`;

const RectangularPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${RECTANGLE_WIDTH};
  height: ${RECTANGLE_HEIGHT};
  background-image: url(${background});
  border: 2px solid #BFBFBF;
  border-radius: 25px;
  filter: brightness(100%);
  transition: width ${TRANSITION_DURATION}, height ${TRANSITION_DURATION};
  &:hover {
    width: calc(${RECTANGLE_WIDTH} + ${INCREASE_WHEN_HOVER});
    height: calc(${RECTANGLE_HEIGHT} + ${INCREASE_WHEN_HOVER});
    box-shadow: 10px 15px 24px #aaaaaa;
    filter: brightness(125%);
  }
`

export default FunctionField;

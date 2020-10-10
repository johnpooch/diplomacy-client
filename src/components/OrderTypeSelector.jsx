import React from 'react';
import styled from '@emotion/styled';

import { Button } from '../styles';

const StyledButton = styled(Button)`
  text-transform: capitalize;
`;

const OrderTypeSelector = (props) => {
  const { choices, onClickChoice } = props;
  console.log(onClickChoice);

  const buttons = [];
  choices.forEach((choice) => {
    buttons.push(
      <StyledButton key={choice} onClick={() => onClickChoice(choice)}>
        {choice}
      </StyledButton>
    );
  });

  return <div>{buttons}</div>;
};

export default OrderTypeSelector;

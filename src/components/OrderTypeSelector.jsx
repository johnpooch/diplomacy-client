import React from 'react';
import styled from '@emotion/styled';

import { Button } from './Button';

const StyledButton = styled(Button)`
  text-transform: capitalize;
`;

const OrderTypeSelector = (props) => {
  const { name, choices, onClickChoice } = props;

  const buttons = [];
  choices.forEach((choice) => {
    buttons.push(
      <StyledButton
        name={name}
        key={choice}
        onClick={() => onClickChoice(name, choice)}
      >
        {choice}
      </StyledButton>
    );
  });

  return <div>{buttons}</div>;
};

export default OrderTypeSelector;

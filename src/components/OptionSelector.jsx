import React from 'react';
import styled from '@emotion/styled';

import { Button } from './Button';

const StyledButton = styled(Button)`
  text-transform: capitalize;
`;

const OptionSelector = ({ choices, onSelect }) => {
  const buttons = [];
  choices.forEach((choice) => {
    buttons.push(
      <StyledButton key={choice[0]} onClick={() => onSelect(choice[1])}>
        {choice[2]}
      </StyledButton>
    );
  });

  return <div>{buttons}</div>;
};

export default OptionSelector;

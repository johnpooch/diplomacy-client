import React from 'react';
import styled from '@emotion/styled';

import { Button, Grid } from '../styles';
import { spacing } from '../variables';

const StyledButton = styled(Button)`
  text-transform: capitalize;
`;

const OrderTypeSelector = (props) => {
  const { choices, onClickChoice } = props;

  const buttons = [];
  choices.forEach((choice) => {
    buttons.push(
      <StyledButton key={choice} onClick={() => onClickChoice(choice)}>
        {choice}
      </StyledButton>
    );
  });

  return (
    <div>
      <Grid columns={buttons.length} columnGap={`${spacing[1]}px`}>
        {buttons}
      </Grid>
    </div>
  );
};

export default OrderTypeSelector;

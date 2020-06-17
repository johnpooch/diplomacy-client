import React from 'react';
import styled from '@emotion/styled';

import { Button, Grid } from '../styles';
import { spacing } from '../variables';

const StyledGrid = styled(Grid)`
  margin-top: ${spacing[4]}px;
`;

const OrderSelector = (props) => {
  const { choices, onClickChoice } = props;

  const buttons = [];
  choices.forEach((choice) => {
    buttons.push(
      <Button key={choice} onClick={() => onClickChoice(choice)}>
        {choice}
      </Button>
    );
  });

  return (
    <div>
      <StyledGrid columns={buttons.length} columnGap={`${spacing[1]}px`}>
        {buttons}
      </StyledGrid>
    </div>
  );
};

export default OrderSelector;

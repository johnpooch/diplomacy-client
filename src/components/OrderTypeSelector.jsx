import React from 'react';

import { Button, Grid } from '../styles';
import { spacing } from '../variables';

const OrderTypeSelector = (props) => {
  const { choices, onClickChoice } = props;

  const buttons = [];
  choices.forEach((choice) => {
    const capitalizedChoice =
      choice.charAt(0).toUpperCase() + choice.substr(1).toLowerCase();
    buttons.push(
      <Button key={choice} onClick={() => onClickChoice(choice)}>
        {capitalizedChoice}
      </Button>
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

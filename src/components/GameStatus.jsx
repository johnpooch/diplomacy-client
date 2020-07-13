import React from 'react';
import styled from '@emotion/styled';

import { fontSizes } from '../variables';

const StyledSpan = styled.span`
  text-transform: capitalize;
  font-size: ${fontSizes.sans[2]}px;
`;

const GameStatus = (props) => {
  const { game } = props;
  const { current_turn: currentTurn, status } = game;
  let message = '';
  if (!currentTurn) {
    if (status === 'pending') {
      message = 'Waiting for players to join.';
    }
  } else {
    const { phase, season, year } = currentTurn;
    message = `${season} ${year} - ${phase}`;
  }
  return (
    <StyledSpan style={{ textTransform: 'capitalize' }}>{message}</StyledSpan>
  );
};

export default GameStatus;

import React from 'react';
import styled from '@emotion/styled';
import { fontSizes } from '../variables';

const StyledSpan = styled.span`
  text-transform: capitalize;
  font-size: ${fontSizes.sans[1]}px;
  margin-bottom: 1rem;
`;

const GameStatus = (props) => {
  const { status, turn } = props;
  let message = '';
  if (!turn) {
    if (status === 'pending') {
      message = 'Waiting for players to join.';
    }
  } else {
    const { phase, season, year } = turn;
    message = `${season} ${year} - ${phase}`;
  }
  return <StyledSpan>{message}</StyledSpan>;
};

export default GameStatus;

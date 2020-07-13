import React from 'react';
import styled from '@emotion/styled';

import GameSummary from './GameSummary';
import { spacing } from '../variables';

const StyledList = styled.ol`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: ${spacing[5]}px;
  grid-column-gap: ${spacing[5]}px;
`;

function GameSummaryList(props) {
  const { games } = props;
  if (!games || !games.length) return null;
  const elements = [];
  games.forEach((game) => {
    elements.push(<GameSummary key={game.id} game={game} />);
  });
  return <StyledList>{elements}</StyledList>;
}

export default GameSummaryList;

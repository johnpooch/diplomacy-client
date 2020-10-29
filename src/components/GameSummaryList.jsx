import React from 'react';
import styled from '@emotion/styled';

import Loading from './Loading';
import GameSummary from './GameSummary';

import { spacing } from '../variables';

const StyledList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: ${spacing[5]}px;
  grid-column-gap: ${spacing[5]}px;
`;

const StyledDiv = styled.div`
  text-align: center;
`;

function GameSummaryList({ games, isLoaded }) {
  if (!isLoaded) return <Loading />;
  if (!games.length) return <StyledDiv>No games found!</StyledDiv>;
  const elements = games.map((game) => {
    return <GameSummary key={game.id} game={game} />;
  });
  return <StyledList>{elements}</StyledList>;
}

export default GameSummaryList;

import React from 'react';
import { connect } from 'react-redux';
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

function GameSummaryList(props) {
  const { games, isLoaded } = props;
  if (!isLoaded) return <Loading />;
  if (!games.length) return <StyledDiv>No games found!</StyledDiv>;
  const elements = [];
  games.forEach((game) => {
    elements.push(<GameSummary key={game.id} game={game} />);
  });
  return <StyledList>{elements}</StyledList>;
}

const mapStateToProps = (state) => {
  return {
    isLoaded: Boolean(
      !state.entities.games.loading && state.entities.variants.allIds.length
    ),
  };
};

export default connect(mapStateToProps, null)(GameSummaryList);

import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { spacing } from '../variables';

import GameSummaryList from '../components/GameSummaryList';
import GameFilters from '../components/GameFilters';
import Page from '../components/Page';

import { getGames } from '../store/selectors';
import { choiceActions } from '../store/choices';
import { gamesRequested } from '../store/games';
import { variantActions } from '../store/variants';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: ${spacing[5]}px;
  grid-column-gap: ${spacing[5]}px;
`;

const BrowseGames = (props) => {
  const { loadGames, games, token } = props;

  const filterGames = (filters) => {
    loadGames(token, filters);
  };

  return (
    <Page headingText={null} isLoaded>
      <StyledDiv>
        <div>
          <GameFilters callback={filterGames} />
          <GameSummaryList games={games} />
        </div>
        <div>My active games</div>
      </StyledDiv>
    </Page>
  );
};

const mapStateToProps = (state) => {
  const games = getGames(state);
  return {
    games,
    token: state.auth.token,
    variants: state.entities.variants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadGames: (token, filters) => dispatch(gamesRequested(token, filters)),
    loadVariants: () => dispatch(variantActions.loadVariants()),
    loadChoices: () => dispatch(choiceActions.loadChoices()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseGames);

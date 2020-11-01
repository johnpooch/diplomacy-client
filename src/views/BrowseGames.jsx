import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { spacing } from '../variables';

import GameSummaryList from '../components/GameSummaryList';
import GameFilters from '../components/GameFilters';
import Page from '../components/Page';

import { choiceActions } from '../store/choices';
import { variantActions } from '../store/variants';

import { getDenormalizedGamesList } from '../store/denormalizers';
import { gameActions } from '../store/games';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-row-gap: ${spacing[5]}px;
  grid-column-gap: ${spacing[5]}px;
`;

const BrowseGames = (props) => {
  const {
    choices,
    getGames,
    games,
    isLoaded,
    location,
    prepareBrowseGames,
    token,
  } = props;

  useEffect(() => {
    prepareBrowseGames(token);
  }, [location.pathname]);

  const filterGames = (filters) => {
    getGames(token, filters);
  };

  return (
    <Page isLoaded>
      <StyledDiv>
        <div>
          <GameFilters callback={filterGames} choices={choices} />
          <GameSummaryList games={games} isLoaded={isLoaded} />
        </div>
        <div>My active games</div>
      </StyledDiv>
    </Page>
  );
};

const mapStateToProps = (state, { location }) => {
  const { browseGamesLoaded } = state.entities.games;
  let games = null;
  if (browseGamesLoaded) {
    games = getDenormalizedGamesList(state);
  }
  const isLoaded = browseGamesLoaded;
  return {
    choices: state.choices,
    games,
    isLoaded,
    location,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  const prepareBrowseGames = (token) => {
    dispatch(variantActions.getVariants({ token }));
    dispatch(gameActions.getGames({ token }));
    dispatch(choiceActions.getChoices());
  };
  const getGames = (token, filters) =>
    dispatch(gameActions.getGames({ token, filters }));

  return { getGames, prepareBrowseGames };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseGames);

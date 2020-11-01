import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import GameFilters from '../components/GameFilters';
import GameSummaryList from '../components/GameSummaryList';
import Page from '../components/Page';
import { choiceActions } from '../store/choices';
import { gameActions } from '../store/games';
import { getDenormalizedGamesList } from '../store/denormalizers';
import { variantActions } from '../store/variants';

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
    <Page>
      <GameFilters callback={filterGames} choices={choices} />
      <GameSummaryList games={games} isLoaded={isLoaded} />
    </Page>
  );
};

const mapStateToProps = (state, { location }) => {
  const { browseGamesLoaded } = state.entities.games;
  let games = null;
  if (browseGamesLoaded) games = getDenormalizedGamesList(state);
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

import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Games from '../components/Games';
import GamesFilters from '../components/GamesFilters';
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
      <GamesFilters callback={filterGames} choices={choices} />
      <Games games={games} />
    </Page>
  );
};

const mapStateToProps = (state, { location }) => {
  const { browseGamesLoaded } = state.entities.games;
  let games = null;
  if (browseGamesLoaded) games = getDenormalizedGamesList(state);
  return {
    choices: state.choices,
    games,
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

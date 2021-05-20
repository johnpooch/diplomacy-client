import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ComponentError from '../components/ComponentError';
import Games from '../components/Games';
import GamesFilters from '../components/GamesFilters';
import Page from '../components/Page';
import { gameActions, gameSelectors } from '../store/games';
import { variantActions } from '../store/variants';

const BrowseGames = (props) => {
  const {
    joinGame,
    leaveGame,
    listGamesError,
    listVariantsError,
    loaded,
    loading,
    games,
    prepareBrowseGames,
    token,
  } = props;

  useEffect(() => {
    prepareBrowseGames(token);
  }, []);

  const gameComponent = loading || !loaded ? null : <Games games={games} />;
  const error = listGamesError || listVariantsError;

  return (
    <Page>
      <GamesFilters />
      {error ? <ComponentError error={error} /> : gameComponent}
    </Page>
  );
};

const mapStateToProps = (state, { location }) => {
  const listGamesError = state.entities.games.error;
  const listVariantsError = state.entities.variants.error;
  const { token } = state.auth;
  const { loading, loaded } = state.entities.games;
  const games = gameSelectors.selectAll(state);
  return {
    games,
    loaded,
    loading,
    location,
    token,
    listVariantsError,
    listGamesError,
  };
};

const mapDispatchToProps = (dispatch) => {
  const prepareBrowseGames = (token) => {
    dispatch(variantActions.listVariants({ token }));
    dispatch(gameActions.listGames({ token }));
  };

  return { prepareBrowseGames };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseGames);

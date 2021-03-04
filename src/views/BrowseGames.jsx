import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ComponentError from '../components/ComponentError';
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
    listGames,
    listGamesError,
    listVariantsError,
    games,
    location,
    prepareBrowseGames,
    token,
  } = props;

  useEffect(() => {
    // This will only be called on initial page load
    if (!games) {
      prepareBrowseGames(token);
    }
  }, [location.pathname]);

  const filterGames = (filters) => {
    listGames(token, filters);
  };

  const error = listGamesError || listVariantsError;

  return (
    <Page>
      <GamesFilters callback={filterGames} choices={choices} />
      {error ? <ComponentError error={error} /> : <Games games={games} />}
    </Page>
  );
};

const mapStateToProps = (state, { location }) => {
  const { loaded: variantsLoaded } = state.entities.variants;
  const { browseGamesLoaded, loading } = state.entities.games;
  const listGamesError = state.entities.games.error;
  const listVariantsError = state.entities.variants.error;
  let games = null;
  if (browseGamesLoaded && variantsLoaded && !loading)
    games = getDenormalizedGamesList(state);
  return {
    choices: state.choices,
    games,
    location,
    token: state.auth.token,
    listVariantsError,
    listGamesError,
  };
};

const mapDispatchToProps = (dispatch) => {
  const prepareBrowseGames = (token) => {
    dispatch(variantActions.listVariants({ token }));
    dispatch(gameActions.listGames({ token }));
    dispatch(choiceActions.getGameFilterChoices({}));
  };
  const listGames = (token, queryParams) =>
    dispatch(gameActions.listGames({ token, queryParams }));

  return { listGames, prepareBrowseGames };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowseGames);

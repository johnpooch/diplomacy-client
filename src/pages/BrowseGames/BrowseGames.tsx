import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BrowseGameFilter from '../../components/BrowseGameFilter';
import ComponentError from '../../components/ComponentError';
import GameCard from '../../components/GameCard/GameCard';
import { Container, Grid } from '../../components/MaterialUI';
import PageLoading from '../../components/PageLoading';
import actions from '../../store/actions';
import selectors from '../../store/selectors';

import useStyles from './BrowseGames.styles';
import { BrowseGamesPageProps } from './BrowseGames.types';

export const BrowseGames: React.FC<ReduxProps & BrowseGamesPageProps> = ({
  browseGameFilter,
  errors,
  games,
  joinGame,
  leaveGame,
  loading,
  loadBrowseGames,
  setBrowseGameFilter,
}) => {
  useEffect(() => {
    loadBrowseGames();
  }, [browseGameFilter]);
  const classes = useStyles();

  const BrowseGamesList = loading ? (
    <PageLoading />
  ) : (
    <>
      {games.map((game) => (
        <Grid key={game.id} item>
          <GameCard joinGame={joinGame} leaveGame={leaveGame} game={game} />
        </Grid>
      ))}
    </>
  );

  return (
    <Container maxWidth="md" className={classes.root}>
      {errors.length ? (
        <ComponentError error={errors[0]} />
      ) : (
        <Grid container direction="column" spacing={1}>
          <div className={classes.browseGameFilter}>
            <BrowseGameFilter
              handleChange={(e) => setBrowseGameFilter(e.target.value)}
              selected={browseGameFilter}
            />
          </div>
          {BrowseGamesList}
        </Grid>
      )}
    </Container>
  );
};

const mapState = (state) => {
  const { browseGameFilter } = state.ui;
  const games = selectors.selectBrowseGames(state);
  const loading = selectors.selectBrowseGamesLoading(state);
  const errors = selectors.selectErrors(
    state,
    'listGamesStatus',
    'listVariantsStatus'
  );
  return { browseGameFilter, errors, games, loading };
};

const mapDispatch = {
  setBrowseGameFilter: actions.setBrowseGameFilter,
  joinGame: actions.joinGame,
  leaveGame: actions.leaveGame,
  loadBrowseGames: actions.loadBrowseGames,
};

const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connect(mapState, mapDispatch)(BrowseGames));

import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ComponentError from '../../components/ComponentError';
import GameCard from '../../components/GameCard/GameCard';
import { Container, Grid } from '../../components/MaterialUI';
import PageLoading from '../../components/PageLoading';
import actions from '../../store/actions';
import selectors from '../../store/selectors';

import useStyles from './BrowseGames.styles';
import { BrowseGamesPageProps } from './BrowseGames.types';

export const BrowseGames: React.FC<ReduxProps & BrowseGamesPageProps> = ({
  errors,
  games,
  joinGame,
  leaveGame,
  loading,
  loadBrowseGames,
}) => {
  useEffect(() => {
    loadBrowseGames();
  }, []);
  const classes = useStyles();

  if (loading) return <PageLoading />;

  return (
    <Container maxWidth="md" className={classes.root}>
      {errors.length ? (
        <ComponentError error={errors[0]} />
      ) : (
        <Grid container direction="column" spacing={1}>
          {games.map((game) => (
            <Grid key={game.id} item>
              <GameCard joinGame={joinGame} leaveGame={leaveGame} game={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const mapState = (state) => {
  const games = selectors.selectBrowseGames(state);
  const loading = selectors.selectBrowseGamesLoading(state);
  const errors = selectors.selectErrors(
    state,
    'listGamesStatus',
    'listVariantsStatus'
  );
  return { errors, games, loading };
};

const mapDispatch = {
  joinGame: actions.joinGame,
  leaveGame: actions.leaveGame,
  loadBrowseGames: actions.loadBrowseGames,
};

const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connect(mapState, mapDispatch)(BrowseGames));

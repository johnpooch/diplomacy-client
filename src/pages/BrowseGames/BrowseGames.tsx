import { CircularProgress, Container, useTheme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import GameCard from '../../components/GameCard/GameCard';
import GameCardGrid from '../../components/GameCardGrid/GameCardGrid';
import PageWrapper from '../../components/PageWrapper';
import actions from '../../store/actions';
import selectors from '../../store/selectors';

import useStyles from './BrowseGames.styles';
import { BrowseGamesPageProps } from './BrowseGames.types';

export const BrowseGames: React.FC<ReduxProps & BrowseGamesPageProps> = ({
  alerts,
  alertsClear,
  games,
  joinGame,
  leaveGame,
  loading,
  logout,
  loadBrowseGames,
}) => {
  useEffect(() => {
    loadBrowseGames();
  }, []);

  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <PageWrapper alerts={alerts} alertsClear={alertsClear} logout={logout}>
      <Container maxWidth="md">
        {loading ? (
          <div className={classes.progressDiv}>
            <CircularProgress />
          </div>
        ) : (
          <GameCardGrid>
            {games.map((game) => (
              <GameCard
                joinGame={joinGame}
                leaveGame={leaveGame}
                game={game}
                key={game.slug}
              />
            ))}
          </GameCardGrid>
        )}
      </Container>
    </PageWrapper>
  );
};

const mapState = (state) => {
  const alerts = selectors.selectAlerts(state);
  const games = selectors.selectBrowseGames(state);
  const loading = selectors.selectBrowseGamesLoading(state);
  return { alerts, games, loading };
};

const mapDispatch = {
  alertsClear: actions.alertsClear,
  joinGame: actions.joinGame,
  leaveGame: actions.leaveGame,
  loadBrowseGames: actions.loadBrowseGames,
  logout: actions.logout,
};

const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default connect(mapState, mapDispatch)(BrowseGames);

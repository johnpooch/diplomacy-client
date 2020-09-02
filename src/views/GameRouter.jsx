import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Error from './Error';
import PreGame from './PreGame';
import Game from './Game';
import { alertsAdd } from '../store/alerts';
import { logout } from '../store/auth';
import { getCurrentTurn, getGame } from '../store/selectors';

const GameRouter = (props) => {
  const { loading, game, user } = props;

  if (loading) {
    return <Loading />;
  }
  if (!game) return <Error text="Game not found" />;

  const { status } = game;
  if (status === 'active') {
    return <Game game={game} />;
  }
  return <PreGame game={game} user={user} />;
};

const mapStateToProps = (state, props) => {
  const { match } = props;
  const game = getGame(state, match.params.slug);
  const currentTurn = getCurrentTurn(state, game);
  return {
    user: state.auth.user,
    token: state.auth.token,
    loading: state.entities.games.loading,
    game,
    currentTurn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onJoin: (name) =>
      dispatch(
        alertsAdd({
          message: `Joined "${name}"! The game will begin once all players have joined.`,
          category: 'success',
        })
      ),
    onLeave: (name) =>
      dispatch(
        alertsAdd({
          message: `You have left "${name}".`,
          category: 'success',
        })
      ),
    onError: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GameRouter));

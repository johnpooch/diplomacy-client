import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Error from './Error';
import PreGame from './PreGame';
import Game from './Game';
import { getGame } from '../store/selectors';

const GameRouter = (props) => {
  const { loading, game, user } = props;

  if (loading) return <Loading />;
  if (!game) return <Error text="Game not found" />;

  const { status } = game;
  if (status === 'active') {
    return <Game slug={game.slug} />;
  }
  return <PreGame game={game} user={user} />;
};

const mapStateToProps = (state, props) => {
  const { match } = props;
  const game = getGame(state, match.params.slug);
  return {
    user: state.auth.user,
    token: state.auth.token,
    loading: state.entities.games.loading,
    game,
  };
};

export default connect(mapStateToProps, null)(withRouter(GameRouter));

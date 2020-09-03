import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '../components/Loading';
import Map from '../components/Map';
import StatusBar from '../components/StatusBar';
import { gameActions } from '../store/games';
import { getCurrentTurn, getGame } from '../store/selectors';

const Game = (props) => {
  const { currentTurn, game, isLoaded, loadGame, slug, token } = props;

  const [activeTurn, setActiveTurn] = useState(currentTurn);

  useEffect(() => {
    loadGame(token, slug);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }
  return (
    <div>
      <Map
        game={game}
        turn={activeTurn}
        playerOrders={playerOrders}
        privateNationState={privateNationState}
        getPrivate={this.getPrivate}
      />
      <StatusBar
        game={game}
        privateNationState={privateNationState}
        finalizeOrders={this.finalizeOrders}
        turn={activeTurn}
        isProcessing={isProcessing}
        _setTurn={(_id) => {
          setActiveTurn(_id);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { slug } = props;
  const game = getGame(state, slug);
  const currentTurn = getCurrentTurn(state, game);
  return {
    currentTurn,
    game,
    isLoaded: game.detailLoaded,
    user: state.auth.user,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadGame: (token, slug) =>
      dispatch(gameActions.gameDetailRequest(token, slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));

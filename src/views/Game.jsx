import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loading from '../components/Loading';
import Map from '../components/Map';
import StatusBar from '../components/StatusBar';
import { gameActions } from '../store/games';
import { nationStateActions } from '../store/nationStates';
import { getCurrentTurn, getGame, getUserNation } from '../store/selectors';

const Game = (props) => {
  const {
    currentTurn,
    finalizeOrders,
    game,
    isLoaded,
    isProcessing,
    loadGame,
    getPrivateNationState,
    slug,
    token,
    userNation,
  } = props;

  const [activeTurn, setActiveTurn] = useState(currentTurn);

  useEffect(() => {
    loadGame(token, slug);
    if (userNation) getPrivateNationState(token, slug);
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div>
      <Map game={game} turn={activeTurn} />
      <StatusBar
        game={game}
        userNation={userNation}
        finalizeOrders={() => finalizeOrders(token, userNation.nationStateId)}
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
  const { user } = state.auth;
  const currentTurn = getCurrentTurn(state, game);
  const userNation = getUserNation(state, currentTurn, user);
  return {
    currentTurn,
    game,
    isLoaded: game.detailLoaded,
    isProcessing: state.entities.nationStates.loading,
    user,
    userNation,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadGame: (token, slug) =>
      dispatch(gameActions.gameDetailRequest(token, slug)),
    getPrivateNationState: (token, slug) =>
      dispatch(nationStateActions.privateNationStateRequested(token, slug)),
    finalizeOrders: (token, nationStateId) => {
      dispatch(gameActions.finalizeOrdersRequest(token, nationStateId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));

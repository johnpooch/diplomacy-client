import React, { useEffect, useState } from 'react';
import { connect, useStore } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Canvas from '../components/Canvas';
import MobileContextMenu from '../components/MobileContextMenu';
import Sidebar from '../components/Sidebar';
import { initialOrderState } from '../game/BaseInterpreter';
import DummyInterpreter from '../game/DummyInterpreter';
import { initializeInterpreterFromState } from '../game/index';
import { gameDetailActions } from '../store/gameDetail';
import { gameActions } from '../store/games';
import { orderActions } from '../store/orders';
import {
  selectCurrentTurnByGame,
  selectFirstTurnByGame,
} from '../store/selectors';
import { surrenderActions } from '../store/surrenders';
import { variantActions } from '../store/variants';

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const CanvasWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const Game = (props) => {
  const {
    browser,
    clearGameDetail,
    currentTurn,
    drawResponseLoading,
    firstTurnId,
    createOrder,
    game,
    location,
    prepareGameDetail,
    slug,
    toggleSurrender,
  } = props;

  const [order, setOrder] = useState(initialOrderState);
  const [activeTurnId, setActiveTurn] = useState();

  const state = useStore().getState();

  useEffect(() => {
    prepareGameDetail(slug);
    return clearGameDetail;
  }, [location.pathname]);

  if (!game || !game.loaded) return null; // return <Loading />;

  // Set the active turn to the current turn on initial load
  if (!activeTurnId) {
    setActiveTurn(currentTurn.id);
  }

  const setTurn = (id) => {
    /* Used by the TurnNav component to update the active turn */
    if (id === 'FIRST') return setActiveTurn(firstTurnId);
    if (id === 'CURRENT') return setActiveTurn(currentTurn.id);
    return setActiveTurn(id);
  };

  const activeTurnIsCurrent = activeTurnId === currentTurn.id;

  const gameInterpreter = activeTurnIsCurrent
    ? initializeInterpreterFromState(
        state,
        currentTurn,
        order,
        () => createOrder(slug, currentTurn.id, order),
        setOrder
      )
    : new DummyInterpreter();

  const isMobile = browser.lessThan.small;

  return (
    <GameWrapper>
      <Sidebar
        activeTurnId={activeTurnId}
        currentTurn={currentTurn}
        drawResponseLoading={drawResponseLoading}
        draws={currentTurn.draws}
        game={game}
        participants={game.participants}
        setTurn={setTurn}
        toggleSurrender={(id) => toggleSurrender(currentTurn.id, id)}
        variant={game.variant}
        // TODO: clean this up
      />
      <CanvasWrapper>
        <Canvas turn={activeTurnId} gameInterpreter={gameInterpreter} />
      </CanvasWrapper>
      {gameInterpreter.showContextMenu() && isMobile && (
        <MobileContextMenu
          onClickOption={gameInterpreter.onClickOption}
          options={gameInterpreter.getContextMenuOptions()}
        />
      )}
    </GameWrapper>
  );
};

const mapStateToProps = (state, { match }) => {
  const { slug } = match.params;
  const { browser } = state;
  const game = state.entities.gameDetail;

  const firstTurnId = game.loaded
    ? selectFirstTurnByGame(state, game.id)
    : null;

  const currentTurn = game.loaded
    ? selectCurrentTurnByGame(state, game.id)
    : null;

  const { loading: drawResponseLoading } = state.entities.drawResponses;
  return {
    browser,
    currentTurn,
    drawResponseLoading,
    firstTurnId,
    game,
    slug,
  };
};

const mapDispatchToProps = (dispatch) => {
  const prepareGameDetail = (gameSlug) => {
    dispatch(variantActions.listVariants({})).then(() => {
      let urlParams = { gameSlug };
      dispatch(gameActions.getGameDetail({ urlParams })).then(({ payload }) => {
        const { id: turnId } = payload.turns.find(
          (t) => t.currentTurn === true
        );
        urlParams = { turnId };
        dispatch(orderActions.listOrders({ urlParams }));
      });
    });
  };
  const toggleSurrender = (turn, id) => {
    if (id) dispatch(surrenderActions.cancelSurrender({ turn, id }));
    else dispatch(surrenderActions.setSurrender({ turn }));
  };
  const createOrder = (gameSlug, turnId, data) => {
    let urlParams = { gameSlug };
    dispatch(orderActions.createOrder({ urlParams, data })).then(() => {
      urlParams = { turnId };
      dispatch(orderActions.listOrders({ urlParams }));
    });
  };
  const clearGameDetail = () => dispatch(gameDetailActions.clearGameDetail());

  return {
    clearGameDetail,
    createOrder,
    prepareGameDetail,
    toggleSurrender,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));

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
import { alertActions } from '../store/alerts';
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
  height: 100vh;
  width: 100vw;

  @media only screen and (max-width: ${(p) => p.theme.breakpoints[1]}) {
    display: grid;
    grid-template-rows: auto 1fr;
  }
`;

const CanvasWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  width: 100%;
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
    userIsParticipant,
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

  const gameInterpreter =
    activeTurnIsCurrent && userIsParticipant
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
        <Canvas
          turn={activeTurnId}
          gameInterpreter={gameInterpreter}
          order={order}
        />
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

  const userIsParticipant = game.loaded
    ? game.participants.includes(state.auth.user.id)
    : false;

  const { loading: drawResponseLoading } = state.entities.drawResponses;
  return {
    browser,
    currentTurn,
    drawResponseLoading,
    firstTurnId,
    game,
    slug,
    userIsParticipant,
  };
};

const mapDispatchToProps = (dispatch) => {
  const prepareGameDetail = (gameSlug) => {
    // We clear games to avoid browse games rendering before loading games
    dispatch(gameActions.clearGames());
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
    dispatch(orderActions.createOrder({ urlParams, data })).then(
      ({ error, payload }) => {
        if (error) {
          // TODO tidy this up
          dispatch(
            alertActions.alertsAdd({
              message: Object.values(payload)[0],
              category: 'error',
            })
          );
        } else {
          urlParams = { turnId };
          dispatch(orderActions.listOrders({ urlParams }));
        }
      }
    );
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

import React, { useEffect, useState } from 'react';
import { connect, useStore } from 'react-redux';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, NavLink } from 'react-router-dom';

import { BackButton } from '../components/Button';
import {
  selectCurrentTurnByGame,
  selectUserNationByTurn,
} from '../store/selectors';
import { gameDetailActions } from '../store/gameDetail';
import { gameActions } from '../store/games';
import { orderActions } from '../store/orders';
import { surrenderActions } from '../store/surrenders';
import { variantActions } from '../store/variants';
import { initialGameFormState, Phases } from '../game/base';

import DummyInterface from '../game/DummyInterface';
import OrderInterface from '../game/OrderInterface';
import BuildInterface from '../game/BuildInterface';
import DisbandInterface from '../game/DisbandInterface';
import RetreatInterface from '../game/RetreatInterface';
import Canvas from '../components/Canvas';
import MobileContextMenu from '../components/MobileContextMenu';
import Sidebar from '../components/Sidebar';

const NavLinkButton = BackButton.withComponent(NavLink);
const HomeNavLinkButton = () => (
  <NavLinkButton
    exact
    to="/"
    css={`
      position: fixed;
      top: ${(p) => p.theme.space[2]};
      left: ${(p) => p.theme.space[2]};
    `}
  >
    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x" />
  </NavLinkButton>
);

const getInterfaceClass = (phase, userNation) => {
  switch (phase) {
    case Phases.ORDER:
      return OrderInterface;
    case Phases.RETREAT:
      return RetreatInterface;
    default:
      if (userNation.supplyDelta < 0) {
        return DisbandInterface;
      }
      if (userNation.supplyDelta > 1) {
        return BuildInterface;
      }
      return DummyInterface;
  }
};

const Game = (props) => {
  const {
    browser,
    clearGameDetail,
    currentTurn,
    drawResponseLoading,
    createOrder,
    game,
    location,
    prepareGameDetail,
    slug,
    toggleSurrender,
    userNation,
  } = props;

  const [gameForm, setGameForm] = useState(initialGameFormState);
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

  const postOrder = () => {
    createOrder(slug, currentTurn.id, gameForm);
  };

  const InterfaceClass = getInterfaceClass(currentTurn.phase, userNation);
  const gameInterface = new InterfaceClass(
    { postOrder },
    gameForm,
    setGameForm,
    currentTurn,
    userNation,
    state
  );

  const isMobile = browser.lessThan.small;

  return (
    <div>
      <Canvas currentTurn={currentTurn} gameInterface={gameInterface} />
      <Sidebar
        currentTurn={currentTurn}
        game={game}
        toggleSurrender={(id) => toggleSurrender(currentTurn.id, id)}
        drawResponseLoading={drawResponseLoading}
        participants={game.participants}
        draws={currentTurn.draws}
        variant={game.variant}
        // TODO: clean this up
      />
      {gameInterface.showContextMenu() && isMobile && (
        <MobileContextMenu
          onOptionSelected={gameInterface.onOptionSelected}
          options={gameInterface.getOptions()}
        />
      )}
      <HomeNavLinkButton />
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  const { slug } = match.params;
  const { browser } = state;
  const game = state.entities.gameDetail;
  const currentTurn = game.loaded
    ? selectCurrentTurnByGame(state, game.id)
    : null;
  const userNation = currentTurn
    ? selectUserNationByTurn(state, currentTurn.id)
    : null;
  const { loading: drawResponseLoading } = state.entities.drawResponses;
  return { browser, drawResponseLoading, game, slug, userNation, currentTurn };
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

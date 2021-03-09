/** @jsx jsx */
import { connect, useStore } from 'react-redux';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jsx } from '@emotion/core';
import { useEffect, useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import { BackButton } from '../components/Button';
import { selectCurrentTurnByGame } from '../store/selectors';
import { gameDetailActions } from '../store/gameDetail';
import { gameActions } from '../store/games';
import { initialGameFormState } from '../game/base';
import { orderActions } from '../store/orders';
import { surrenderActions } from '../store/surrenders';
import { variables } from '../variables';
import { variantActions } from '../store/variants';
import Canvas from '../components/Canvas';
import GameInterface from '../game/gameInterface';
import Sidebar from '../components/Sidebar';

const NavLinkButton = BackButton.withComponent(NavLink);
const HomeNavLinkButton = () => (
  <NavLinkButton
    exact
    to="/"
    css={{
      position: 'fixed',
      top: `${variables.spacing[2]}px`,
      left: `${variables.spacing[2]}px`,
    }}
  >
    <FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x" />
  </NavLinkButton>
);

const Game = (props) => {
  const {
    clearGameDetail,
    currentTurn,
    drawResponseLoading,
    createOrder,
    game,
    location,
    prepareGameDetail,
    slug,
    toggleSurrender,
    token,
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
    createOrder(token, slug, currentTurn.id, gameForm);
  };
  const gameInterface = new GameInterface(
    { postOrder },
    gameForm,
    setGameForm,
    currentTurn,
    state
  );

  return (
    <div>
      <Canvas currentTurn={currentTurn} gameInterface={gameInterface} />
      <Sidebar
        currentTurn={currentTurn}
        toggleSurrender={(id) => toggleSurrender(token, currentTurn.id, id)}
        drawResponseLoading={drawResponseLoading}
        participants={game.participants}
        draws={currentTurn.draws}
        variant={game.variant}
        // TODO: clean this up
      />
      <HomeNavLinkButton />
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  const { slug } = match.params;
  const { token } = state.auth;
  const game = state.entities.gameDetail;
  const currentTurn = game.loaded
    ? selectCurrentTurnByGame(state, game.id)
    : null;
  const { loading: drawResponseLoading } = state.entities.drawResponses;
  return { drawResponseLoading, game, slug, token, currentTurn };
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
  const toggleSurrender = (token, turn, id) => {
    if (id) dispatch(surrenderActions.cancelSurrender({ token, turn, id }));
    else dispatch(surrenderActions.setSurrender({ token, turn }));
  };
  const createOrder = (token, gameSlug, turnId, data) => {
    let urlParams = { gameSlug };
    dispatch(orderActions.createOrder({ token, urlParams, data })).then(() => {
      urlParams = { turnId };
      dispatch(orderActions.listOrders({ token, urlParams }));
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

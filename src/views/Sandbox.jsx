import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Canvas from '../components/Canvas';
import sandboxGameData from '../data/standard/sandbox.json';

import { initialGameFormState } from '../game/base';
import SandboxGameInterface from '../game/sandboxGameInterface';
import { getDenormalizedGameDetail } from '../store/denormalizers';
import { gameActions, gameSelectors } from '../store/games';
import { orderActions } from '../store/orders';
import { pieceActions } from '../store/pieces';
import { variantActions } from '../store/variants';

const Sandbox = (props) => {
  const {
    addOrder,
    addPiece,
    game,
    location,
    prepareSandbox,
    removePiece,
    token,
  } = props;

  const [gameForm, setGameForm] = useState(initialGameFormState);

  useEffect(() => {
    prepareSandbox(token);
  }, [location.pathname]);

  if (!game) return null;

  const turn = game.turns[0];
  const gameInterface = new SandboxGameInterface(
    { addOrder, addPiece, removePiece },
    gameForm,
    setGameForm,
    turn
  );

  return <Canvas currentTurn={turn} gameInterface={gameInterface} />;
};

const mapStateToProps = (state) => {
  let game = gameSelectors.selectById(state, 'SANDBOX');
  if (game) {
    game = getDenormalizedGameDetail(state, game.id, null);
  }
  const { token } = state.auth;
  return { game, token };
};

const mapDispatchToProps = (dispatch) => {
  const addOrder = (order) => {
    dispatch(orderActions.addOrder(order));
  };
  const addPiece = (territory, type, nation) => {
    const pieceData = {
      nation,
      type,
      territory,
      namedCoast: null,
      dislodged: false,
      dislodgedBy: null,
      attackerTerritory: null,
      mustRetreat: false,
    };
    dispatch(pieceActions.addPiece(pieceData));
  };
  const removePiece = (id) => {
    dispatch(pieceActions.removePiece(id));
  };
  const prepareSandbox = (token) => {
    dispatch(variantActions.listVariants({ token })).then(() => {
      dispatch(gameActions.getGameDetail.fulfilled(sandboxGameData));
    });
  };

  return {
    addOrder,
    addPiece,
    prepareSandbox,
    removePiece,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sandbox));

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dialogue from '../components/Dialogue';
import Map from '../components/Map';
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

  return (
    <div>
      <Map gameInterface={gameInterface} turn={turn} />
      <Dialogue gameInterface={gameInterface} />
    </div>
  );
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
      named_coast: null,
      dislodged: false,
      dislodged_by: null,
      attacker_territory: null,
      must_retreat: false,
    };
    dispatch(pieceActions.addPiece(pieceData));
  };
  const removePiece = (id) => {
    dispatch(pieceActions.removePiece(id));
  };
  const prepareSandbox = (token) => {
    dispatch(variantActions.getVariants({ token })).then(() => {
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

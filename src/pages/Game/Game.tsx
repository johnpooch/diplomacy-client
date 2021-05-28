import { Snackbar, SnackbarOrigin } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useStore } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Alert from '../../components/Alert';
import Canvas from '../../components/Canvas';
import ComponentError from '../../components/ComponentError';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import GameNavBar from '../../components/GameNavBar';
import PageLoading from '../../components/PageLoading';
import { initialOrderState } from '../../game/BaseInterpreter';
import DummyInterpreter from '../../game/DummyInterpreter';
import { initializeInterpreterFromState } from '../../game/index';
import actions from '../../store/actions';
import selectors from '../../store/selectors';

import { GamePageProps } from './Game.types';

export const Game: React.FC<
  ReduxProps & GamePageProps & RouteComponentProps
> = ({
  alerts,
  alertsClear,
  cancelOrder,
  clearGameDetail,
  createOrder,
  currentTurn,
  currentTurnId,
  errors,
  finalizeOrders,
  loadGame,
  loading,
  nation,
  userNationState,
  nationOrderHistories,
  numOrders,
  orders,
  ordersFinalized,
  setActiveTurn,
  slug,
  turn,
  turnDisplay,
  turnNavIds,
}) => {
  const state = useStore().getState();
  useEffect(() => {
    loadGame(slug);
    return () => clearGameDetail();
  }, []);
  const [order, setOrder] = useState(initialOrderState);
  const [controlPanelOpen, setControlPanelOpen] = useState(false);

  const toggleControlPanelOpen = () => setControlPanelOpen(!controlPanelOpen);
  const SNACKBAR_POSITION: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  };

  if (loading) return <PageLoading />;
  if (errors.length) return <ComponentError error={errors[0]} />;

  const gameInterpreter = currentTurn
    ? initializeInterpreterFromState(
        state,
        turn,
        order,
        () => createOrder(slug, turn.id, order),
        setOrder
      )
    : new DummyInterpreter();

  const mapWrapperStyle = {
    // -webkit-fill-available is used instead of 100% to prevent issue controls
    // on mobile block part of the canvas
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
  };

  return (
    <>
      <GameNavBar
        nation={nation}
        onClickOpenControlPanel={toggleControlPanelOpen}
        setTurn={setActiveTurn}
        turn={turnDisplay}
        turnNavIds={turnNavIds}
      />
      <div style={mapWrapperStyle}>
        <Canvas
          turn={turn.id}
          gameInterpreter={gameInterpreter}
          order={order}
        />
      </div>
      <ControlPanel
        cancelOrder={(orderId) => cancelOrder(currentTurnId, orderId)}
        currentTurn={currentTurn}
        finalizeOrders={() => finalizeOrders(slug, userNationState.id)}
        nationOrderHistories={nationOrderHistories}
        numOrdersGiven={orders.length}
        numOrdersToGive={numOrders}
        open={controlPanelOpen}
        orders={orders}
        ordersFinalized={ordersFinalized}
        ordersFinalizedLoading={
          userNationState ? userNationState.loading : true
        }
      />
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open
          anchorOrigin={SNACKBAR_POSITION}
          autoHideDuration={6000}
          onClose={() => alertsClear(alert.id)}
        >
          <Alert onClose={() => alertsClear(alert.id)} alert={alert} />
        </Snackbar>
      ))}
    </>
  );
};

const mapState = (state, { match }) => {
  const errors = selectors.selectErrors(
    state,
    'getGameDetailStatus',
    'listVariantsStatus'
  );
  const { slug } = match.params;
  const {
    currentTurn,
    currentTurnId,
    loading,
    userNationState,
    nation,
    nationOrderHistories,
    orders,
    ordersFinalized,
    nextTurn,
    numOrders,
    previousTurn,
    turn,
    turnDisplay,
  } = selectors.selectGameDetail(state);
  const firstTurnId = selectors.selectFirstTurnId(state);
  const turnNavIds = {
    first: firstTurnId,
    current: currentTurnId,
    next: nextTurn,
    previous: previousTurn,
  };

  const alerts = selectors.selectAlerts(state);
  return {
    alerts,
    currentTurn,
    currentTurnId,
    errors,
    loading,
    nation,
    userNationState,
    nationOrderHistories,
    ordersFinalized,
    numOrders,
    orders,
    slug,
    turn,
    turnDisplay,
    turnNavIds,
  };
};

const mapDispatch = {
  alertsClear: actions.alertsClear,
  cancelOrder: actions.cancelOrder,
  clearGameDetail: actions.clearGameDetail,
  createOrder: actions.createOrder,
  finalizeOrders: actions.finalizeOrders,
  loadGame: actions.loadGameDetail,
  setActiveTurn: actions.setActiveTurn,
};

const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connect(mapState, mapDispatch)(Game));

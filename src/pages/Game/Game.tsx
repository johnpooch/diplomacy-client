import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useStore } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Alert from '../../components/Alert';
import Canvas from '../../components/Canvas';
import ComponentError from '../../components/ComponentError';
import ContextMenu from '../../components/ContextMenu';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import GameNavBar from '../../components/GameNavBar';
import {
  Drawer,
  Snackbar,
  SnackbarOrigin,
  Toolbar,
} from '../../components/MaterialUI';
import PageLoading from '../../components/PageLoading';
import TurnNav from '../../components/TurnNav';
import { initialOrderState } from '../../game/BaseInterpreter';
import DummyInterpreter from '../../game/DummyInterpreter';
import { initializeInterpreterFromState } from '../../game/index';
import actions from '../../store/actions';
import selectors from '../../store/selectors';

import useStyles from './Game.styles';

export const Game: React.FC<ReduxProps & RouteComponentProps> = ({
  alerts,
  alertsClear,
  browser,
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
  nationStates,
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
  const classes = useStyles();

  const toggleControlPanelOpen = () => setControlPanelOpen(!controlPanelOpen);
  const SNACKBAR_POSITION: SnackbarOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  };

  if (loading) return <PageLoading />;
  if (errors.length) return <ComponentError error={errors[0]} />;

  const gameInterpreter =
    currentTurn && nation
      ? initializeInterpreterFromState(
          state,
          turn,
          order,
          () => createOrder(slug, turn.id, order),
          setOrder
        )
      : new DummyInterpreter();
  const isMobile = browser.lessThan.medium;

  return (
    <>
      <GameNavBar
        isMobile={isMobile}
        nation={nation}
        onClickOpenControlPanel={toggleControlPanelOpen}
        setTurn={setActiveTurn}
        turn={turnDisplay}
        turnNavIds={turnNavIds}
      />
      <Canvas turn={turn.id} gameInterpreter={gameInterpreter} order={order} />
      <Drawer
        BackdropProps={{ invisible: true }}
        variant="persistent"
        anchor="right"
        open={controlPanelOpen}
        classes={{ paper: classes.drawerPaper }}
      >
        <Toolbar variant="dense" />
        <ControlPanel
          cancelOrder={(orderId) => cancelOrder(currentTurnId, orderId)}
          currentTurn={currentTurn}
          finalizeOrders={() =>
            finalizeOrders(slug, nationStates.find((ns) => ns.isUser).id)
          }
          nationStates={nationStates}
        />
      </Drawer>
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
      {isMobile && (
        <>
          <Drawer
            BackdropProps={{ invisible: true }}
            variant="persistent"
            anchor="bottom"
            open={gameInterpreter.showContextMenu()}
            classes={{ paper: classes.contextMenu }}
          >
            {gameInterpreter.showContextMenu() && (
              <ContextMenu
                onClickOption={gameInterpreter.onClickOption}
                options={gameInterpreter.getContextMenuOptions()}
              />
            )}
          </Drawer>
          <div className={classes.bottomNav}>
            <TurnNav
              turn={turn}
              turnNavIds={turnNavIds}
              setTurn={setActiveTurn}
            />
          </div>
        </>
      )}
    </>
  );
};

const mapState = (state, { match }) => {
  const errors = selectors.selectErrors(
    state,
    'getGameDetailStatus',
    'listOrdersStatus',
    'listVariantsStatus'
  );
  const { slug } = match.params;
  const { browser } = state;
  const {
    currentTurn,
    currentTurnId,
    loading,
    nation,
    nationStates,
    nextTurn,
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
    browser,
    currentTurn,
    currentTurnId,
    errors,
    loading,
    nation,
    nationStates,
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

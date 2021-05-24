import { CircularProgress, Container, useTheme, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation, withRouter } from 'react-router-dom';

import ComponentError from '../../components/ComponentError';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import GameCard from '../../components/GameCard/GameCard';
import GameNavBar from '../../components/GameNavBar';
import actions from '../../store/actions';
import selectors from '../../store/selectors';

import useStyles from './Game.styles';
import { GamePageProps } from './Game.types';

export const Game: React.FC<ReduxProps & GamePageProps> = ({
  errors,
  loading,
  loadGame,
}) => {
  useEffect(() => {
    loadGame();
  }, []);

  const theme = useTheme();
  const classes = useStyles(theme);
  const [controlPanelOpen, setControlPanelOpen] = useState(false);
  const toggleControlPanelOpen = () => setControlPanelOpen(!controlPanelOpen);
  return (
    <>
      <GameNavBar onClickOpenControlPanel={toggleControlPanelOpen} />;
      <ControlPanel
        currentTurn
        open={controlPanelOpen}
        nationOrderHistories={nationOrderHistories}
      />
      ;
    </>
  );
};

const mapState = (state) => {
  // const errors = selectors.selectErrors(
  //   state,
  //   'listGamesStatus',
  //   'listVariantsStatus'
  // );
  return { errors: [], loading: false };
};

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connect(mapState, mapDispatch)(Game));

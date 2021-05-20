import { MuiThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import RouterLoggedIn from './RouterLoggedIn';
import RouterLoggedOut from './RouterLoggedOut';
import { alertActions, alertSelectors } from './store/alerts';
import { errorActions } from './store/errors';
import { theme } from './theme';

const App = ({
  alerts,
  alertsClear,
  clearAndPromoteAlerts,
  clearErrors,
  loggedIn,
}) => {
  const location = useLocation();

  useEffect(() => {
    clearErrors();
    clearAndPromoteAlerts();
  }, [location.pathname]);

  return (
    <MuiThemeProvider theme={theme}>
      {loggedIn ? <RouterLoggedIn /> : <RouterLoggedOut />}
    </MuiThemeProvider>
  );
};

const mapState = (state) => {
  const { loggedIn } = state.auth;
  return {
    alerts: alertSelectors.selectAll(state),
    loggedIn,
  };
};

const mapDispatch = {
  clearErrors: errorActions.clearErrors,
  clearAndPromoteAlerts: alertActions.clearAndPromoteAlerts,
  alertsClear: alertActions.alertsClear,
};

export default connect(mapState, mapDispatch)(App);

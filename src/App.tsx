import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { MuiThemeProvider, CssBaseline } from './components/MaterialUI';
import RouterLoggedIn from './RouterLoggedIn';
import RouterLoggedOut from './RouterLoggedOut';
import { alertActions } from './store/alerts';
import { errorActions } from './store/errors';
import { theme } from './theme';

const App = ({ clearAndPromoteAlerts, clearErrors, loggedIn }) => {
  const location = useLocation();

  // TODO move this logic to redux middleware
  useEffect(() => {
    clearErrors();
    clearAndPromoteAlerts();
  }, [location.pathname]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {loggedIn ? <RouterLoggedIn /> : <RouterLoggedOut />}
    </MuiThemeProvider>
  );
};

const mapState = (state) => {
  const { loggedIn } = state.auth;
  return { loggedIn };
};

const mapDispatch = {
  clearErrors: errorActions.clearErrors,
  clearAndPromoteAlerts: alertActions.clearAndPromoteAlerts,
};

export default connect(mapState, mapDispatch)(App);

import { MuiThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Alerts from './components/Alerts';
import RouterLoggedOut from './RouterLoggedOut';
import { alertActions, alertSelectors } from './store/alerts';
import { errorActions } from './store/errors';
import { theme } from './theme';
import RouterLoggedIn from './views/RouterLoggedIn';

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
      <Alerts alerts={alerts} onClick={alertsClear} />
      {/* {loggedIn ? <RouterLoggedIn /> : <RouterLoggedOut />} */}
      <RouterLoggedOut />
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state) => {
  const { loggedIn } = state.auth;
  return {
    alerts: alertSelectors.selectAll(state),
    loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  const alertsClear = (id) => {
    dispatch(alertActions.alertsClear(id));
  };
  const clearAndPromoteAlerts = () => {
    dispatch(alertActions.alertsClearActive());
    dispatch(alertActions.alertsPromotePending());
  };
  const clearErrors = () => dispatch(errorActions.clearErrors());
  return {
    alertsClear,
    clearAndPromoteAlerts,
    clearErrors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import RouterLoggedIn from './RouterLoggedIn';
import RouterLoggedOut from './RouterLoggedOut';

import Alerts from '../components/Alerts';
import { theme } from '../theme';
import GlobalStyles from '../globalStyles';

import { alertActions, alertSelectors } from '../store/alerts';

const App = ({ alerts, alertsClear, clearAndPromoteAlerts, loggedIn }) => {
  const [formErrors, setFormErrors] = useState({
    nonFieldErrors: [],
  });

  const location = useLocation();

  useEffect(() => {
    clearAndPromoteAlerts();
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Alerts alerts={alerts} onClick={alertsClear} />
      {loggedIn ? (
        <RouterLoggedIn formErrors={formErrors} setFormErrors={setFormErrors} />
      ) : (
        <RouterLoggedOut
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      )}
    </ThemeProvider>
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
  return {
    alertsClear,
    clearAndPromoteAlerts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

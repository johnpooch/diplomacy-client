import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import RouterLoggedIn from './RouterLoggedIn';
import RouterLoggedOut from './RouterLoggedOut';

import AlertList from '../components/AlertList';
import Navigation from '../components/Navigation';

import { authActions } from '../store/auth';
import { alertActions, alertSelectors } from '../store/alerts';

const App = (props) => {
  const {
    alerts,
    alertsClear,
    clearAndPromoteAlerts,
    loggedIn,
    logout,
    user,
  } = props;

  const location = useLocation();

  useEffect(() => {
    clearAndPromoteAlerts();
  }, [location.pathname]);

  // User is logged out
  if (!loggedIn) {
    return (
      <div>
        <AlertList alerts={alerts} onClick={alertsClear} />
        <RouterLoggedOut />
      </div>
    );
  }

  // User is logged in
  return (
    <div>
      <Navigation loggedIn={loggedIn} onLogout={logout} user={user} />
      <AlertList alerts={alerts} onClick={alertsClear} />
      <RouterLoggedIn />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loggedIn, user } = state.auth;
  return {
    alerts: alertSelectors.selectAll(state),
    loggedIn,
    user,
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
  const logout = () => {
    dispatch(authActions.logout());
  };
  return {
    alertsClear,
    clearAndPromoteAlerts,
    logout,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

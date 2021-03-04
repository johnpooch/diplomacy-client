import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import RouterLoggedIn from './RouterLoggedIn';
import RouterLoggedOut from './RouterLoggedOut';

import Alerts from '../components/Alerts';

import { alertActions, alertSelectors } from '../store/alerts';

const App = (props) => {
  const [formErrors, setFormErrors] = useState({
    nonFieldErrors: [],
  });

  const { alerts, alertsClear, clearAndPromoteAlerts, loggedIn } = props;

  const location = useLocation();

  useEffect(() => {
    clearAndPromoteAlerts();
  }, [location.pathname]);

  const router = loggedIn ? (
    <RouterLoggedIn formErrors={formErrors} setFormErrors={setFormErrors} />
  ) : (
    <RouterLoggedOut formErrors={formErrors} setFormErrors={setFormErrors} />
  );

  return (
    <div>
      <Alerts alerts={alerts} onClick={alertsClear} />
      {router}
    </div>
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

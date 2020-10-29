import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import Auth from './Auth';
import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import Error from './Error';
import Game from './Game';
import PreGame from './PreGame';

import AlertList from '../components/AlertList';
import Header from '../components/Header';
import PrivateRoute from '../components/PrivateRoute';

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

  return (
    <div>
      <Header loggedIn={loggedIn} onLogout={logout} user={user} />
      <AlertList alerts={alerts} onClick={alertsClear} />
      <Switch>
        <PrivateRoute
          exact
          path="/create-game"
          component={CreateGame}
          loggedIn={loggedIn}
        />
        <PrivateRoute
          exact
          path="/pre-game/:slug"
          component={PreGame}
          loggedIn={loggedIn}
        />
        <PrivateRoute
          exact
          path="/game/:slug"
          component={Game}
          loggedIn={loggedIn}
        />
        <PrivateRoute
          exact
          path="/"
          component={BrowseGames}
          loggedIn={loggedIn}
        />
        <Route path="/" component={Auth} />
        <Route component={() => <Error text="Page not found" />} />
      </Switch>
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

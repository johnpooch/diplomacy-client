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

import { alertActions } from '../store/alerts';

const App = (props) => {
  const { clearAndPromoteAlerts } = props;
  const location = useLocation();

  useEffect(() => {
    clearAndPromoteAlerts();
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <AlertList />
      <Switch>
        <PrivateRoute exact path="/create-game" component={CreateGame} />
        <PrivateRoute exact path="/pre-game/:slug" component={PreGame} />
        <PrivateRoute exact path="/game/:slug" component={Game} />
        <PrivateRoute exact path="/" component={BrowseGames} />
        <Route path="/" component={Auth} />
        <Route component={() => <Error text="Page not found" />} />
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  const clearAndPromoteAlerts = () => {
    dispatch(alertActions.alertsClearActive());
    dispatch(alertActions.alertsPromotePending());
  };
  return { clearAndPromoteAlerts };
};

export default connect(null, mapDispatchToProps)(App);

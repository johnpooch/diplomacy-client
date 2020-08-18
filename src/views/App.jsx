import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import Auth from './Auth';
import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import GameRouter from './GameRouter';
import Error from './Error';

import AlertList from '../components/AlertList';
import Header from '../components/Header';
import LoggedOutRoute from '../components/LoggedOutRoute';
import PrivateRoute from '../components/PrivateRoute';

import { clearActive, promotePending } from '../store/alerts';
import flagActions from '../store/actions/flags';

import { LISTNATIONFLAGSURL } from '../api';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearActive());
    dispatch(promotePending());
  }, [location.pathname]);

  dispatch(flagActions.getFlagsIfNeeded());
  dispatch({
    type: 'API_CALL_START',
    payload: {
      url: LISTNATIONFLAGSURL,
      method: 'GET',
      onSuccess: 'FLAGS_RECEIVED',
      onError: 'FLAGS_REQUEST_FAILED',
    },
  });

  return (
    <div>
      <Header />
      <AlertList />
      <Switch>
        <PrivateRoute exact path="/create-game" component={CreateGame} />
        <PrivateRoute exact path="/game/:slug" component={GameRouter} />
        <PrivateRoute exact path="/" component={BrowseGames} />
        <LoggedOutRoute path="/" component={Auth} />
        <Route component={() => <Error text="Page not found" />} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps, null)(App);

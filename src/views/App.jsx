import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import Auth from './Auth';
import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import GameRouter from './GameRouter';
import Error from './Error';

import AlertList from '../components/AlertList';
import Header from '../components/Header';
import PrivateRoute from '../components/PrivateRoute';

import { clearActive, promotePending } from '../store/alerts';

import { loadFlags } from '../store/flags';

const App = (props) => {
  const { loggedIn } = props;
  const ref = useRef();
  ref.current = loggedIn;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearActive());
    dispatch(promotePending());
  }, [location.pathname]);

  useEffect(() => {
    console.log(ref);
    if (loggedIn) {
      console.log('LOGGED IN!');
    } else {
      console.log('LOGGED OUT!');
    }
  }, [loggedIn]);

  dispatch(loadFlags());

  return (
    <div>
      <Header />
      <AlertList />
      <Switch>
        <PrivateRoute exact path="/create-game" component={CreateGame} />
        <PrivateRoute exact path="/game/:slug" component={GameRouter} />
        <PrivateRoute exact path="/" component={BrowseGames} />
        <Route path="/" component={Auth} />
        <Route component={() => <Error text="Page not found" />} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps, null)(App);

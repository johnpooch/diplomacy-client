import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import Error from './Error';
import GameRouter from './GameRouter';
import Login from './Login';
import Register from './Register';
import AlertList from '../components/AlertList';
import Header from '../components/Header';
import LoggedOutRoute from '../components/LoggedOutRoute';
import PrivateRoute from '../components/PrivateRoute';
import alertActions from '../store/actions/alerts';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(alertActions.clearActive());
    dispatch(alertActions.promotePending());
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <AlertList />
      <Switch>
        <LoggedOutRoute exact path="/login" component={Login} />
        <LoggedOutRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/create-game" component={CreateGame} />
        <PrivateRoute exact path="/game/:id" component={GameRouter} />
        <PrivateRoute exact path="/" component={BrowseGames} />
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

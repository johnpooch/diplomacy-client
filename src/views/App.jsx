import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import React, { useEffect } from 'react';
// import { connect, useDispatch } from 'react-redux';
// import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';

import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import Error from './Error';
import Game from './Game';
import Login from './Login';
import Register from './Register';
// import FlashMessage from '../components/FlashMessage';
import Header from '../components/Header';
import PrivateRoute from '../components/PrivateRoute';
// import alertActions from '../store/actions/alert';

const App = (props) => {
  const { alerts } = props;

  // const dispatch = useDispatch();
  // const location = useLocation();
  // useEffect(() => {
  //   dispatch(alertActions.clear());
  // }, [location.pathname]);
  console.log(alerts);

  return (
    <BrowserRouter>
      <Header />
      {/* <FlashMessage text={alert.message} type={alert.type} /> */}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/create-game" component={CreateGame} />
        <PrivateRoute path="/game/:id" component={Game} />
        <PrivateRoute exact path="/" component={BrowseGames} />
        <Route component={Error} text="Page not found" />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps, null)(App);

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Redirect, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import BrowseGames from './pages/BrowseGames';
import CreateGame from './pages/CreateGame/CreateGame';
import UserSettings from './pages/UserSettings/UserSettings';
import Error from './views/Error';
import Game from './views/Game';
import PreGame from './views/PreGame';

const RouterLoggedIn = (props) => {
  const { loggedIn } = props;

  const RouteWithNavigation = ({ component: Component, ...routeProps }) => {
    return (
      <Route
        {...routeProps}
        render={(componentProps) => <Component {...componentProps} />}
      />
    );
  };

  return (
    <Switch>
      <RouteWithNavigation
        exact
        path="/create-game"
        component={CreateGame}
        loggedIn={loggedIn}
      />
      <RouteWithNavigation
        exact
        path="/pre-game/:slug"
        component={PreGame}
        loggedIn={loggedIn}
      />
      <Route exact path="/game/:slug" component={Game} />
      <RouteWithNavigation
        exact
        path="/"
        component={BrowseGames}
        loggedIn={loggedIn}
      />
      <RouteWithNavigation
        exact
        path="/user-settings"
        component={UserSettings}
        loggedIn={loggedIn}
      />
      <Route exact path={['/forgot-password', '/login', '/register']}>
        <Redirect to="/" />
      </Route>
      <RouteWithNavigation component={() => <Error text="Page not found" />} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  const { loggedIn } = state.auth;
  return {
    loggedIn,
  };
};

export default connect(mapStateToProps, null)(withRouter(RouterLoggedIn));

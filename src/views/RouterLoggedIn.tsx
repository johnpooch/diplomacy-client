/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Redirect, Route } from 'react-router-dom';

import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import Error from './Error';
import Game from './Game';
import Navigation from '../components/Navigation';
import PreGame from './PreGame';

const RouterLoggedIn = (props) => {
  const { loggedIn } = props;

  const RouteWithNavigation = ({ component: Component, ...routeProps }) => {
    return (
      <Route
        {...routeProps}
        render={(componentProps) => (
          <div>
            <Navigation />
            <Component {...componentProps} />
          </div>
        )}
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

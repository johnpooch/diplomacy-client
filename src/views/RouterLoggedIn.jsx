import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Redirect, Route } from 'react-router-dom';

import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import Error from './Error';
import Game from './Game';
import PreGame from './PreGame';

import { alertActions } from '../store/alerts';
import { authActions } from '../store/auth';

const RouterLoggedIn = (props) => {
  const { loggedIn } = props;

  return (
    <Switch>
      <Route
        exact
        path="/create-game"
        component={CreateGame}
        loggedIn={loggedIn}
      />
      <Route
        exact
        path="/pre-game/:slug"
        component={PreGame}
        loggedIn={loggedIn}
      />
      <Route exact path="/game/:slug" component={Game} loggedIn={loggedIn} />
      <Route exact path="/" component={BrowseGames} loggedIn={loggedIn} />
      <Route exact path="/login">
        <Redirect to="/" />
      </Route>
      <Route component={() => <Error text="Page not found" />} />
    </Switch>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  const category = 'success';
  const pending = true;
  return {
    forgotPassword: (setErrors, email) =>
      dispatch(authActions.forgotPassword({ email })).then(
        ({ error, payload }) => {
          const message = `Thanks! Please check ${email} for a link to reset your password.`;
          if (error) {
            setErrors(payload);
          } else {
            dispatch(alertActions.alertsAdd({ message, category, pending }));
            history.push('/login');
          }
        }
      ),
    login: (setErrors, username, password) =>
      dispatch(authActions.login({ username, password })).then(
        ({ payload }) => {
          setErrors(payload);
        }
      ),
    register: (setErrors, username, email, password) =>
      dispatch(authActions.register({ username, email, password })).then(
        ({ error, payload }) => {
          const message = 'Account created! Log in to continue.';
          if (error) {
            setErrors(payload);
          } else {
            dispatch(alertActions.alertsAdd({ message, category, pending }));
            history.push('/login');
          }
        }
      ),
    resetPassword: (setErrors, token, password) =>
      dispatch(authActions.resetPassword({ token, password })).then(
        ({ error, payload }) => {
          const message = 'Password updated!';
          if (error) {
            setErrors(payload);
          } else {
            dispatch(alertActions.alertsAdd({ message, category, pending }));
            history.push('/login');
          }
        }
      ),
  };
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RouterLoggedIn));

import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';

import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import { alertActions } from '../store/alerts';
import { authActions } from '../store/auth';

const RouterLoggedOut = (props) => {
  const { forgotPassword, login, register, resetPassword } = props;
  return (
    <Switch>
      <Route
        exact
        path={['/', '/login']}
        component={() => <Login onAuth={login} />}
      />
      <Route
        exact
        path="/register"
        component={() => <Register onAuth={register} />}
      />
      <Route
        exact
        path="/forgot-password"
        component={() => <ForgotPassword onAuth={forgotPassword} />}
      />
      <Route
        exact
        path="/reset-password"
        component={() => <ResetPassword onAuth={resetPassword} />}
      />
      <Redirect to="/" />
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RouterLoggedOut)
);

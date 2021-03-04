import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';

import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';
import { successMessages } from '../copy';
import { alertActions } from '../store/alerts';
import { authActions } from '../store/auth';
import { errorActions } from '../store/errors';

const RouterLoggedOut = (props) => {
  const { errors, forgotPassword, login, register, resetPassword } = props;
  return (
    <Switch>
      <Route
        exact
        path={['/', '/login']}
        component={() => <Login onAuth={login} errors={errors} />}
      />
      <Route
        exact
        path="/register"
        component={() => <Register onAuth={register} errors={errors} />}
      />
      <Route
        exact
        path="/forgot-password"
        component={() => (
          <ForgotPassword onAuth={forgotPassword} errors={errors} />
        )}
      />
      <Route
        exact
        path="/reset-password"
        component={() => (
          <ResetPassword onAuth={resetPassword} errors={errors} />
        )}
      />
      <Redirect to="/" />
    </Switch>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  const category = 'success';
  const pending = true;
  return {
    forgotPassword: (email) => {
      const data = { email };
      dispatch(authActions.resetPassword({ data })).then(
        ({ error, payload }) => {
          if (error) {
            dispatch(errorActions.addError(payload));
          } else {
            const template = successMessages.passwordResetLinkSent;
            const message = template.replace('%s', email);
            dispatch(alertActions.alertsAdd({ message, category, pending }));
            history.push('/login');
          }
        }
      );
    },
    login: (username, password) => {
      const data = { username, password };
      dispatch(authActions.login({ data })).then(({ payload }) => {
        dispatch(errorActions.addError(payload));
      });
    },
    register: (username, email, password) => {
      const data = { username, email, password };
      dispatch(authActions.register({ data })).then(({ error, payload }) => {
        if (error) {
          dispatch(errorActions.addError(payload));
        } else {
          const message = successMessages.accountCreated;
          dispatch(alertActions.alertsAdd({ message, category, pending }));
          history.push('/login');
        }
      });
    },
    resetPassword: (token, password) => {
      const data = { password };
      dispatch(authActions.resetPasswordConfirm({ token, data })).then(
        ({ error, payload }) => {
          const message = successMessages.passwordUpdated;
          if (error) {
            dispatch(errorActions.addError(payload));
          } else {
            dispatch(alertActions.alertsAdd({ message, category, pending }));
            history.push('/login');
          }
        }
      );
    },
  };
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    errors: state.errors,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RouterLoggedOut)
);

import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import Error from './Error';
import Page from '../components/Page';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { alertActions } from '../store/alerts';
import { authActions } from '../store/auth';
import { spacing } from '../variables';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-column-gap: ${(props) =>
    props.columnGap ? props.columnGap : `${spacing[4]}px`};
  grid-row-gap: ${(props) => (props.rowGap ? props.rowGap : `${spacing[4]}px`)};

  label,
  input {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const Auth = (props) => {
  const {
    forgotPassword,
    history,
    loggedIn,
    login,
    register,
    resetPassword,
  } = props;

  if (loggedIn) {
    history.push('/');
  }

  return (
    <Page isLoaded>
      <Grid>
        <div />
        <Switch>
          <Route exact path="/" render={() => <LoginForm onAuth={login} />} />
          <Route
            exact
            path="/login"
            render={() => <LoginForm onAuth={login} />}
          />
          <Route
            exact
            path="/register"
            render={() => <RegisterForm onAuth={register} />}
          />
          <Route
            exact
            path="/forgot-password"
            render={() => <ForgotPasswordForm onAuth={forgotPassword} />}
          />
          <Route
            exact
            path="/reset-password"
            render={() => <ResetPasswordForm onAuth={resetPassword} />}
          />
          <Route component={() => <Error text="Page not found" />} />
        </Switch>
      </Grid>
    </Page>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));

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
  const { loggedIn, history } = props;

  if (loggedIn) {
    history.push('/');
  }

  return (
    <Page isLoaded>
      <Grid>
        <div />
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/forgot-password" component={ForgotPasswordForm} />
          <Route exact path="/reset-password" component={ResetPasswordForm} />
          <Route component={() => <Error text="Page not found" />} />
        </Switch>
      </Grid>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps, null)(withRouter(Auth));

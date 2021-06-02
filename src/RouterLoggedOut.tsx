import React from 'react';
import { Switch, withRouter, Route, Redirect } from 'react-router-dom';

import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResetPassword from './pages/ResetPassword/ResetPassword';

const RouterLoggedOut = () => {
  return (
    <Switch>
      <Route exact path={['/', '/login']} component={() => <Login />} />
      <Route exact path="/register" component={() => <Register />} />
      <Route
        exact
        path="/forgot-password"
        component={() => <ForgotPassword />}
      />
      <Route exact path="/reset-password" component={() => <ResetPassword />} />
      <Redirect to="/" />
    </Switch>
  );
};

export default withRouter(RouterLoggedOut);

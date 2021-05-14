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

// const mapDispatchToProps = (dispatch, { history }) => {
//   return {
//     forgotPassword: (email) => {
//       const data = { email };
//       dispatch(authActions.resetPassword({ data })).then(
//         ({ error, payload }) => {
//           if (error) {
//             dispatch(errorActions.addError(payload));
//           } else {
//             history.push('/login');
//           }
//         }
//       );
//     },
//     login: (username, password) => {
//       const data = { username, password };
//       dispatch(authActions.login({ data })).then(({ payload }) => {
//         dispatch(errorActions.addError(payload));
//       });
//     },
//     register: (username, email, password) => {
//       const data = { username, email, password };
//       dispatch(authActions.register({ data })).then(({ error, payload }) => {
//         if (error) {
//           dispatch(errorActions.addError(payload));
//         }
//       });
//     },
//     resetPassword: (token, password) => {
//       const data = { token, password };
//       dispatch(authActions.resetPasswordConfirm({ data })).then(
//         ({ error, payload }) => {
//           if (error) {
//             dispatch(errorActions.addError(payload));
//           } else {
//             history.push('/login');
//           }
//         }
//       );
//     },
//   };
// };

// const mapStateToProps = (state) => {
//   return {
//     loggedIn: state.auth.loggedIn,
//     errors: state.errors,
//   };
// };

export default withRouter(RouterLoggedOut);

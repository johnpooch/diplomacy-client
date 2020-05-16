/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import Error from './Error';
import Game from './Game';
import Login from './Login';
import Register from './Register';
import FlashMessage from '../components/FlashMessage';
import Header from '../components/Header';
import alertActions from '../store/actions/alert';

const renderHeader = (loggedIn) => {
  if (!loggedIn) return null;
  return <Header />;
};

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const App = (props) => {
  const { alert, loggedIn } = props;

  // if (!(Object.keys(alert).length === 0 && alert.constructor === Object)) {
  //   const dispatch = useDispatch();
  //   const location = useLocation();
  //   useEffect(() => {
  //     dispatch(alertActions.clear());
  //   }, [location.pathname]);
  // }

  return (
    <div>
      {renderHeader(loggedIn)}
      <FlashMessage text={alert.message} type={alert.type} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute
          exact
          path="/create-game"
          loggedIn={loggedIn}
          component={CreateGame}
        />
        <PrivateRoute path="/game/:id" loggedIn={loggedIn} component={Game} />
        <PrivateRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={BrowseGames}
        />
        <Route>
          <Error text="Page not found" />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps, null)(App);

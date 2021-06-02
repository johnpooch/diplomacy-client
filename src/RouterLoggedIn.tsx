/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Switch,
  withRouter,
  Redirect,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

import PageWrapper from './components/PageWrapper';
import BrowseGames from './pages/BrowseGames';
import CreateGame from './pages/CreateGame/CreateGame';
import Game from './pages/Game';
import UserSettings from './pages/UserSettings/UserSettings';
import actions from './store/actions';
import selectors from './store/selectors';

const RouterLoggedIn: React.FC<ReduxProps & RouteComponentProps> = ({
  alerts,
  alertsClear,
  logout,
}) => {
  const pageWrapperProps = { alerts, alertsClear, logout };
  const withPageWrapper = (WrappedComponent) => {
    return (
      <PageWrapper {...pageWrapperProps}>
        <WrappedComponent />
      </PageWrapper>
    );
  };

  return (
    <Switch>
      <Route exact path="/create-game">
        {withPageWrapper(CreateGame)}
      </Route>
      <Route exact path="/game/:slug">
        <Game />
      </Route>
      <Route exact path="/">
        {withPageWrapper(BrowseGames)}
      </Route>
      <Route exact path="/user-settings">
        {withPageWrapper(UserSettings)}
      </Route>
      <Route exact path={['/forgot-password', '/login', '/register']}>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

const mapState = (state) => {
  const alerts = selectors.selectAlerts(state);
  return { alerts };
};

const mapDispatch = {
  alertsClear: actions.alertsClear,
  logout: actions.logout,
};
const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(RouterLoggedIn));

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
import UserSettings from './pages/UserSettings/UserSettings';
import actions from './store/actions';
import selectors from './store/selectors';

const RouterLoggedIn: React.FC<ReduxProps & RouteComponentProps> = ({
  alerts,
  alertsClear,
  loggedIn,
  logout,
}) => {
  const RouteWithNavigation = ({ component: Component, ...routeProps }) => {
    return (
      <Route
        {...routeProps}
        render={(componentProps) => <Component {...componentProps} />}
      />
    );
  };

  return (
    <PageWrapper alerts={alerts} alertsClear={alertsClear} logout={logout}>
      <Switch>
        <RouteWithNavigation
          exact
          path="/create-game"
          component={CreateGame}
          loggedIn={loggedIn}
        />
        {/* <Route exact path="/game/:slug" component={Game} /> */}
        <RouteWithNavigation
          exact
          path="/"
          component={BrowseGames}
          loggedIn={loggedIn}
        />
        <RouteWithNavigation
          exact
          path="/user-settings"
          component={UserSettings}
          loggedIn={loggedIn}
        />
        <Route exact path={['/forgot-password', '/login', '/register']}>
          <Redirect to="/" />
        </Route>
      </Switch>
    </PageWrapper>
  );
};

const mapState = (state) => {
  const alerts = selectors.selectAlerts(state);
  const { loggedIn } = state.auth;
  return { alerts, loggedIn };
};

const mapDispatch = {
  alertsClear: actions.alertsClear,
  logout: actions.logout,
};
const connector = connect(mapState, mapDispatch);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(RouterLoggedIn));

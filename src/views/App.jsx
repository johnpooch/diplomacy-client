import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import Auth from './Auth';
import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import GameRouter from './GameRouter';
import Error from './Error';

import AlertList from '../components/AlertList';
import Header from '../components/Header';
import PrivateRoute from '../components/PrivateRoute';

import { alertsClearActive, alertsPromotePending } from '../store/alerts';
import { loadFlags } from '../store/flags';
import { choiceActions } from '../store/choices';
import { gamesRequested } from '../store/games';
import { variantActions } from '../store/variants';

const App = (props) => {
  const {
    loadVariants,
    loadGames,
    loadChoices,
    loggedIn,
    token,
    variants,
  } = props;
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(alertsClearActive());
    dispatch(alertsPromotePending());

    if (loggedIn) {
      if (!variants.allIds.length) {
        loadVariants(token);
      }
      // TODO add some sort of logic to determine when to load games again
      loadGames(token);
      loadChoices();
    }
  }, [location.pathname]);

  dispatch(loadFlags());

  return (
    <div>
      <Header />
      <AlertList />
      <Switch>
        <PrivateRoute exact path="/create-game" component={CreateGame} />
        <PrivateRoute exact path="/game/:slug" component={GameRouter} />
        <PrivateRoute exact path="/" component={BrowseGames} />
        <Route path="/" component={Auth} />
        <Route component={() => <Error text="Page not found" />} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alerts: state.alerts,
    loggedIn: state.auth.loggedIn,
    token: state.auth.token,
    variants: state.entities.variants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadGames: (token, filters) => dispatch(gamesRequested(token, filters)),
    loadVariants: () => dispatch(variantActions.loadVariants()),
    loadChoices: () => dispatch(choiceActions.loadChoices()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

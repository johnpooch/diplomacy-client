import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import styled from '@emotion/styled';

import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import Error from './Error';
import Game from './Game';
import Login from './Login';
import Register from './Register';
import FlashMessage from '../components/FlashMessage';
import Header from '../components/Header';
import { sizes } from '../variables';
import alertActions from '../store/actions/alert';

const StyledDiv = styled.div`
  position: relative;
  padding-top: ${sizes.headerHeight}px;
`;

function App(props) {
  const { alert, loggedIn } = props;
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    dispatch(alertActions.clear());
  }, [location.pathname]);

  if (!loggedIn) {
    return (
      <StyledDiv>
        <FlashMessage text={alert.message} type={alert.type} />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
      </StyledDiv>
    );
  }
  return (
    <StyledDiv>
      <Header />
      <FlashMessage text={alert.message} type={alert.type} />
      <Switch>
        <Route path="/game/:id">
          <Game />
        </Route>
        <Route exact path="/create-game">
          <CreateGame />
        </Route>
        <Route exact path="/">
          <BrowseGames />
        </Route>
        <Route path="/login" exact>
          <Redirect to="" />
        </Route>
        <Route path="/register" exact>
          <Redirect to="" />
        </Route>
        <Route>
          <Error text="Page not found" />
        </Route>
      </Switch>
    </StyledDiv>
  );
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps, null)(App);

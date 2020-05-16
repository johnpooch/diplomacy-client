import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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

const StyledDiv = styled.div`
  position: relative;
  padding-top: ${sizes.headerHeight}px;
`;

function App(props) {
  const { alert, loggedIn } = props;

  if (!loggedIn) {
    return (
      <BrowserRouter>
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
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
    loggedIn: state.login.loggedIn,
  };
};

export default connect(mapStateToProps, null)(App);

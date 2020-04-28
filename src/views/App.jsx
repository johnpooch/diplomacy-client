import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Game from './Game';
import Login from './Login';
import Register from './Register';
import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import Home from './Home';
import Error from './Error';
import Header from '../components/Header';
import { sizes } from '../variables';
import * as actions from '../store/actions/auth';

const StyledDiv = styled.div`
  position: relative;
  padding-top: ${sizes.headerHeight}px;
`;

class App extends React.Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }
  render() {
    return (
      <Router>
        <StyledDiv>
          <Header />
          <Switch>
            <Route path="/game/:id">
              <Game />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route exact path="/create-game">
              <CreateGame headers={headers} />
            </Route>
            <Route exact path="/">
              <BrowseGames />
            </Route>
            <Route>
              <Error text="Page not found" />
            </Route>
          </Switch>
        </StyledDiv>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

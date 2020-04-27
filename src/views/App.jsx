import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Game from './Game';
import Login from './Login';
import Register from './Register';
import BrowseGames from './BrowseGames';
import Error from './Error';
import Header, { HEADER_HEIGHT } from '../components/Header';
import * as actions from '../store/actions/auth';

const StyledDiv = styled.div`
  position: relative;
  padding-top: ${HEADER_HEIGHT}px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: App.getAuthHeaders('admin', 'admin'),
    };
  }

  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }

  static getAuthHeaders(username, password) {
    const headers = new Headers();
    headers.set(
      'Authorization',
      `Basic ${window.btoa(`${username}:${password}`)}`
    );
    return headers;
  }

  render() {
    const { headers } = this.state;
    return (
      <Router>
        <StyledDiv>
          <Header />
          <Switch>
            <Route path="/game/:id">
              <Game headers={headers} />
            </Route>
            <Route path="/login">
              <Login headers={headers} />
            </Route>
            <Route path="/register">
              <Register headers={headers} />
            </Route>
            <Route exact path="/">
              <BrowseGames headers={headers} />
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
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

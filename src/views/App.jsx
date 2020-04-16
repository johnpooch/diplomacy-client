import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Game from './Game';
import BrowseGames from './BrowseGames';
import Home from './Home';
import Header, { headerHeight } from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import * as actions from '../store/actions/auth';

const StyledDiv = styled.div`
  position: relative;
  padding-top: ${headerHeight}px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: App.getAuthHeaders('admin', 'admin'),
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
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
          <Header {...this.props} />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route
              path="/login"
              render={(props) => <Login {...props} headers={headers} />}
            />
            <Route
              path="/register"
              render={(props) => <Register {...props} headers={headers} />}
            />
            <Route path="/game/:id">
              <Game headers={headers} />
            </Route>
            <Route path="/browse-games">
              <BrowseGames headers={headers} />
            </Route>
            <Route
              path="/"
              render={(props) => <Home {...props} headers={headers} />}
            />
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

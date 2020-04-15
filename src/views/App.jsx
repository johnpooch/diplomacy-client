import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import Game from './Game';
import BrowseGames from './BrowseGames';
import Home from './Home';
import Header, { headerHeight } from '../components/Header';
import Login from '../components/Login';
import Register from "../components/Register";

const StyledDiv = styled.div`
  position: relative;
  padding-top: ${headerHeight}px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: App.getAuthHeaders('admin', 'admin'),
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    };
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  static getAuthHeaders(username, password) {
    const headers = new Headers();
    headers.set(
      'Authorization',
      `Basic ${window.btoa(`${username}:${password}`)}`
    );
    return headers;
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED IN',
      user: data.user,
      token: data.token,
    });
  }

  handleSuccessfulAuth(data) {
    this.handleLogin(data);
  }

  render() {
    const { headers } = this.state;
    return (
      <Router>
        <StyledDiv>
          <Header />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login">
              <Login headers={headers} />
            </Route>
            <Route path="/register">
              <Register headers={headers} />
            </Route>
            <Route path="/game/:id">
              <Game headers={headers} />
            </Route>
            <Route path="/browse-games">
              <BrowseGames headers={headers} />
            </Route>
            <Route
             path="/"
             render={props => (
               <Home {...props} headers={headers} />
             )}
            >
            </Route>
          </Switch>
        </StyledDiv>
      </Router>
    );
  }
}

export default App;

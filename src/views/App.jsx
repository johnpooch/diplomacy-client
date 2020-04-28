import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import Game from './Game';
import BrowseGames from './BrowseGames';
import CreateGame from './CreateGame';
import Home from './Home';
import Error from './Error';
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
      headers: App.getAuthHeaders(),
    };
  }

  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }

  static getAuthHeaders() {
    const headers = new Headers();
    headers.set('Authorization', `Token ${localStorage.getItem('token')}`);
    return headers;
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
            <Route path="/login" render={() => <Login headers={headers} />} />
            <Route
              path="/register"
              render={() => <Register headers={headers} />}
            />
            <Route path="/game/:id">
              <Game headers={headers} />
            </Route>
            <Route exact path="/browse-games">
              <BrowseGames headers={headers} />
            </Route>
            <Route exact path="/create-game">
              <CreateGame headers={headers} />
            </Route>
            <Route exact path="/">
              <Home headers={headers} />
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

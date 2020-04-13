import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from '@emotion/styled';

import Game from './Game';
import BrowseGames from './BrowseGames';
import Nav from '../components/Nav';
import { colors, fonts, sizes } from '../variables';

const StyledDiv = styled.div`
  font-family: ${fonts.sans};
  color: ${colors.base};
  position: relative;
  padding-top: ${sizes.navHeight}px;

  .view {
    position: relative;
  }

  .button {
    display: inline-block;
    min-width: ${sizes.p * 12}px;
    padding: ${sizes.p}px;
    background: white;
    border: 1px solid ${colors.base};
    outline: none;
    box-shadow: none;
    text-align: center;
    cursor: pointer;
  }

  h1 {
    margin: 0 auto ${sizes.p * 2}px;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: App.getAuthHeaders('admin', 'admin'),
    };
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
          <header>
            <Nav />
          </header>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/game/:id">
              <Game headers={headers} />
            </Route>
            <Route path="/">
              <BrowseGames headers={headers} />
            </Route>
          </Switch>
        </StyledDiv>
      </Router>
    );
  }
}

export default App;

import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import styled from '@emotion/styled'

import Nav from 'Components/Nav/Nav.jsx'
import Game from 'Views/Game/Game.jsx'
import BrowseGames from 'Views/BrowseGames/BrowseGames.jsx'
import { colors, fonts, sizes } from '../../variables'

export const StyledDiv = styled.div`
  font-family: ${fonts.sans};
  color: ${colors.base};
  min-height: 100vh;
  width: 100vw;
  position: relative;
  padding-top: ${sizes.navHeight}px;
`

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      headers: this.getAuthHeaders('admin', 'admin')
    }
  }

  getAuthHeaders (username, password) {
    const headers = new Headers()
    headers.set('Authorization', 'Basic ' + window.btoa(username + ':' + password))
    return headers
  }

  render () {
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
              <Game />
            </Route>
            <Route path="/">
              <BrowseGames />
            </Route>
          </Switch>
        </StyledDiv>
      </Router>
    )
  }
}

export default App

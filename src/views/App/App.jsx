import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Nav from 'Components/Nav/Nav.jsx'

import Game from 'Views/Game/Game.jsx'
// import BrowseGames from 'Views/BrowseGames/BrowseGames.jsx'
import Testing from 'Views/Testing/Testing.jsx'

import './App.scss'

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
        <div className="app">
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
              {/* <BrowseGames /> */}
              <Testing />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
0

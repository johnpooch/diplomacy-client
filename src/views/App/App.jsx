import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
// import PropTypes from 'prop-types'

import Game from 'Views/Game/Game.jsx'
import BrowseGames from 'Views/BrowseGames/BrowseGames.jsx'

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

  // renderNav () {
  //   return (
  //     <nav>
  //       <ul>
  //         <li>
  //           <Link to="/">Browse Games</Link>
  //         </li>
  //       </ul>
  //     </nav>
  //   )
  // }

  render () {
    return (
      <Router>
        <div className="app">
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
        </div>
      </Router>
    )
  }
}

export default App

import React from 'react'

import './App.scss'

import Game from 'Views/Game/Game.jsx'
import BrowseGames from 'Views/BrowseGames/BrowseGames.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: 1,
      headers: this.getAuthHeaders('admin', 'admin')
    }
  }

  getAuthHeaders (username, password) {
    const headers = new Headers()
    headers.set('Authorization', 'Basic ' + window.btoa(username + ':' + password))
    return headers
  }

  renderGame () {
    return (
      <Game
        player={this.state.player}
        headers={this.state.headers}
      />
    )
  }

  renderBrowseGames () {
    return (
      <BrowseGames
        player={this.state.player}
        headers={this.state.headers}
      />
    )
  }

  render () {
    return (
      <div className="app">
        {this.renderBrowseGames()}
      </div>
    )
  }
}

export default App

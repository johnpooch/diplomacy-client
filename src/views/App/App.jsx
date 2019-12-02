import React from 'react'

import './App.scss'

import Game from 'Views/Game/Game.jsx'
import BrowseGames from 'Views/BrowseGames/BrowseGames.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: 1,
      headers: this.getAuthHeaders('admin', 'admin'),
      game: undefined
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
        game={this.state.game}
      />
    )
  }

  renderBrowseGames () {
    return (
      <BrowseGames
        _onClick={this._onClickGame.bind(this)}
        player={this.state.player}
        headers={this.state.headers}
      />
    )
  }

  renderView () {
    if (this.state.game) {
      return this.renderGame()
    } else {
      return this.renderBrowseGames()
    }
  }

  _onClickGame (id) {
    this.setState({
      game: id
    })
  }

  render () {
    return (
      <div className="app">
        {this.renderView()}
      </div>
    )
  }
}

export default App

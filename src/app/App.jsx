import React from 'react'

import './App.scss'

import GameHeader from '../components/GameHeader.jsx'
import Game from '../components/Game.jsx'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: 1
    }
  }

  render () {
    return (
      <div className="app">
        <GameHeader
          player={this.state.player}
        />
        <Game
          player={this.state.player}
        />
      </div>
    )
  }
}

export default App

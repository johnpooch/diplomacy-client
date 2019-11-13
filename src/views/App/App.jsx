import React from 'react'

import './App.scss'

import Game from 'Views/Game/Game.jsx'

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
        <Game player={this.state.player} />
      </div>
    )
  }
}

export default App

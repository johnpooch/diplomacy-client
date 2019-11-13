import React from 'react'

import './App.scss'

import Game from 'Views/Game/Game.jsx'

class App extends React.Component {

  componentDidMount() {
    fetch('http://127.0.0.1:8082/api/v1/games')
    .then(res => res.json())
    .then((data) => {
      console.log(data)
    })
  }

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

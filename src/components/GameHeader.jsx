import React from 'react'
import PropTypes from 'prop-types'

import './GameHeader.scss'

class GameHeader extends React.Component {
  render () {
    return (
      <header className="game-header">
        <h1>Diplomacy app</h1>
        <h2>Player {this.props.player}</h2>
      </header>
    )
  }
}

GameHeader.propTypes = {
  player: PropTypes.number,
  data: PropTypes.object
}

export default GameHeader

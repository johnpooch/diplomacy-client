
import React from 'react'
import PropTypes from 'prop-types'

import './GameMap.scss'
import Territory from 'Components/Territory/Territory.jsx'
import mapData from 'JSON/map.json'
import * as Utils from 'Utilities/utils'

class GameMap extends React.Component {
  renderMap () {
    return (
      <svg
        className="game-map"
        viewBox={mapData.viewBox}
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.renderTerritories()}
      </svg>
    )
  }

  getCurrentTurn () {
    const turns = this.props.game.turns

    for (let i = 0; i < turns.length; i++) {
      if (turns[i].current_turn === true) {
        return turns[i]
      }
    }

    return undefined
  }

  renderTerritories () {
    const turn = this.getCurrentTurn()
    if (!turn) return

    const states = turn.territory_states
    const variant = this.props.game.variant

    const territories = []
    variant.territories.forEach(territory => {
      const id = territory.id
      const state = Utils.getObjectByKey(id, states, 'territory')
      const controller = state ? state.controlled_by : undefined

      territories.push(
        <Territory
          key={id}
          id={id}
          name={territory.name}
          type={territory.type}
          supply_center={territory.supply_center}
          controlled_by={controller}
        />
      )
    })
    return territories
  }

  render () {
    return this.renderMap()
  }
}

GameMap.propTypes = {
  game: PropTypes.object
}

export default GameMap

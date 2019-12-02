
import React from 'react'
import PropTypes from 'prop-types'

import './GameMap.scss'
import Territory from 'Components/Territory/Territory.jsx'
import mapData from 'JSON/map.json'

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

  renderTerritories () {
    const territories = []
    this.props.data.territories.forEach(territory => {
      territories.push(
        <Territory
          key={territory.pk}
          pk={territory.pk}
          name={territory.name}
          type={territory.type}
          coastal={territory.coastal}
          controlledBy={territory.controlled_by}
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
  data: PropTypes.object
}

export default GameMap

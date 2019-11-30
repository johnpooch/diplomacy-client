
import React from 'react'
import PropTypes from 'prop-types'

import './Map.scss'

import mapData from 'JSON/map.json'

const utils = require('Utilities/utils.js')

class Map extends React.Component {
  renderMap () {
    const territories = []
    this.props.data.territories.forEach(territory => {
      territories.push(this.renderTerritory(territory))
    })

    return (
      <svg viewBox="0 0 609 559" xmlns="http://www.w3.org/2000/svg">
        {territories}
      </svg>
    )
  }

  renderTerritory (territory) {
    const polygon = utils.getObjectByKey(territory.pk, mapData).polygon
    return (
      <polygon
        key={territory.pk}
        className="territory"
        data-name={territory.name}
        data-type={territory.type}
        data-coastal={territory.coastal}
        points={polygon}
      />
    )
  }

  render () {
    return (
      <div className="map">
        {this.renderMap()}
      </div>
    )
  }
}

Map.propTypes = {
  data: PropTypes.object
}

export default Map

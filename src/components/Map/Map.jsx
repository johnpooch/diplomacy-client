
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
      <svg viewBox={mapData.viewBox} xmlns="http://www.w3.org/2000/svg">
        {territories}
      </svg>
    )
  }

  renderTerritory (territory) {
    const data = utils.getObjectByKey(territory.pk, mapData.territories)
    return (
      <polygon
        key={territory.pk}
        className="territory"
        data-name={territory.name}
        data-type={territory.type}
        data-coastal={territory.coastal}
        data-controlled-by={territory.controlled_by}
        points={data.polygon}
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

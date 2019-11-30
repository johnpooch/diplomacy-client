import React from 'react'
import PropTypes from 'prop-types'

import './Tooltip.scss'

const utils = require('Utilities/utils.js')

class Tooltip extends React.Component {
  buildTooltip () {
    const tooltip = {}

    const territory = utils.getObjectByKey(this.props.hoverTarget, this.props.data.territories)
    if (territory) {
      tooltip.name = territory.name
      tooltip.coastal = territory.coastal ? 'true' : 'false'
      tooltip.type = territory.type
    }

    const controlledBy = utils.getObjectByKey(territory.controlled_by, this.props.data.nations)
    if (controlledBy) {
      tooltip.nation = controlledBy.name
    }

    const piece = utils.getObjectByKey(this.props.hoverTarget, this.props.data.pieces, 'territory')
    if (piece) {
      tooltip.piece = piece.type
    }

    return tooltip
  }

  render () {
    const elements = []
    const tooltip = this.buildTooltip()

    for (const key in tooltip) {
      const value = tooltip[key]

      elements.push(
        <li key={key}>
          <span className="key">{key}</span>
          <span className="value">{value}</span>
        </li>
      )
    }

    return (
      <div className="tooltip">
        <ul>{elements}</ul>
      </div>
    )
  }
}

Tooltip.propTypes = {
  hoverTarget: PropTypes.number,
  data: PropTypes.object
}

export default Tooltip
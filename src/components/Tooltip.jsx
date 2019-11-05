import React from 'react'
import PropTypes from 'prop-types'

import './Tooltip.scss'

class Tooltip extends React.Component {
  render () {
    const fields = []
    const tooltip = this.props.tooltip

    for (const key in tooltip) {
      fields.push(
        <li
          key={key}
        >
          <span className="key">{key}</span>
          <span className="value">{tooltip[key]}</span>
        </li>
      )
    }
    return (
      <div
        className="tooltip"
      >
        <ul>{fields}</ul>
      </div>
    )
  }
}

Tooltip.propTypes = {
  tooltip: PropTypes.object
}

export default Tooltip

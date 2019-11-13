import React from 'react'
import PropTypes from 'prop-types'

import './SupplyCenter.scss'

class SupplyCenter extends React.Component {
  render () {
    const type = this.props.coastal ? 'FA' : 'A'
    return (
      <div
        className='supply-center'
      >
        <span className="type">{type}</span>
      </div>
    )
  }
}

SupplyCenter.propTypes = {
  coastal: PropTypes.bool
}

export default SupplyCenter

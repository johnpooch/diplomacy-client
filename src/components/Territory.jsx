import React from 'react'
import PropTypes from 'prop-types'

import './Territory.scss'

class Territory extends React.Component {
  render () {
    return (
      <div
        className="territory"
        data-type={this.props.type}
        data-coastal={this.props.coastal}
      >
        {this.props.name}
      </div>
    )
  }
}

Territory.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  coastal: PropTypes.bool
}

export default Territory

import React from 'react'
import PropTypes from 'prop-types'

import './Alert.scss'

class Alert extends React.Component {
  render () {
    const className = `alert ${this.props.type}`
    return (
      <div className={className}>
        {this.props.text}
      </div>
    )
  }
}

Alert.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
}

export default Alert

import React from 'react'
import PropTypes from 'prop-types'

import './Piece.scss'

class Piece extends React.Component {
  hoverStart () {
  }

  hoverEnd () {
  }

  render () {
    return (
      <div
        className="piece"
        data-type={this.props.type}
        onMouseOver={() => this.hoverStart()}
        onMouseOut={() => this.hoverEnd()}
      >
        <span className="type">{this.props.type}</span>
      </div>
    )
  }
}

Piece.propTypes = {
  type: PropTypes.string
}

export default Piece

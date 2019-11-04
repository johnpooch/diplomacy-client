import React from 'react'
import PropTypes from 'prop-types'

import './Piece.scss'

class Piece extends React.Component {
  // hoverStart () {
  //   console.log(this.props.neighbours)
  // }

  // hoverEnd () {

  // }

  render () {
    return (
      <div
        className="piece"
        data-type={this.props.type}
        data-nation={this.props.nation.pk}
        // data-territory={this.props.territory.pk}
        // onMouseOver={() => this.hoverStart()}
        // onMouseOut={() => this.hoverEnd()}
      >
        {this.props.type}
      </div>
    )
  }
}

Piece.propTypes = {
  type: PropTypes.string,
  nation: PropTypes.object,
  territory: PropTypes.object
}

export default Piece

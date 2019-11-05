import React from 'react'
import PropTypes from 'prop-types'

import './Territory.scss'

import Piece from './Piece.jsx'

class Territory extends React.Component {
  renderPiece () {
    if (this.props.piece) {
      const piece = this.props.piece
      return (
        <Piece
          key={piece.pk}
          type={piece.type}
          nation={piece.nation}
        />
      )
    }

    return null
  }

  render () {
    const nation = this.props.nation
    const nationKey = nation ? nation.pk : null

    return (
      <div
        className="territory"
        data-id={this.props.id}
        data-name={this.props.name}
        data-type={this.props.type}
        data-coastal={this.props.coastal}
        data-nation={nationKey}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      >
        <span className="name">{this.props.name}</span>
        {this.renderPiece()}
      </div>
    )
  }
}

Territory.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  coastal: PropTypes.bool,
  neighbours: PropTypes.arrayOf(PropTypes.number),
  nation: PropTypes.object,
  piece: PropTypes.object,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
}

export default Territory

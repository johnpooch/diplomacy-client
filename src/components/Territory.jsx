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
        />
      )
    }

    return null
  }

  render () {
    const nation = this.props.nation
    const nationKey = nation ? nation.pk : null
    // const nationName = nation ? nation.name : null

    return (
      <div
        className="territory"
        data-type={this.props.type}
        data-coastal={this.props.coastal}
        data-nation={nationKey}
      >
        <span className="name">{this.props.name}</span>
        {this.renderPiece()}
        {/* { nationName ? <span className="nation">{nationName}</span> : null } */}
      </div>
    )
  }
}

Territory.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  coastal: PropTypes.bool,
  neighbours: PropTypes.arrayOf(PropTypes.number),
  nation: PropTypes.object,
  piece: PropTypes.object
}

export default Territory

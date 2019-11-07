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
    const className = this.props.selection ? 'territory ' + this.props.selection : 'territory'

    return (
      <div
        className={className}
        data-id={this.props.id}
        data-name={this.props.name}
        data-type={this.props.type}
        data-coastal={this.props.coastal}
        data-supply-center={this.props.supplyCenter}
        data-nation={nationKey}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        onClick={this.props.onClick}
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
  supplyCenter: PropTypes.bool,
  nation: PropTypes.object,
  piece: PropTypes.object,
  selection: PropTypes.oneOf(['selected', 'movable']),
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onClick: PropTypes.func
}

export default Territory

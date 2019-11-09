import React from 'react'
import PropTypes from 'prop-types'

import './Territory.scss'

import Piece from './Piece.jsx'
import SupplyCenter from './SupplyCenter.jsx'

class Territory extends React.Component {
  _onMouseEnterTerritory (e) {
    const id = this.getTerritoryFromEvent(e)
    if (id !== false) {
      this.props._onMouseEnterTerritory(id)
    }
  }

  _onMouseLeaveTerritory (e) {
    this.props._onMouseLeaveTerritory()
  }

  _onClickTerritory (e) {
    const id = this.getTerritoryFromEvent(e)
    if (id !== false) {
      this.props._onClickTerritory(id)
    }
  }

  getTerritoryFromEvent (e) {
    if (!e) {
      return false
    }

    const territory = e.target.closest('.territory')
    if (!territory) {
      return false
    }

    if ('id' in territory.dataset) {
      const id = parseInt(territory.dataset.id)
      return id
    }

    return false
  }

  renderPiece () {
    const piece = this.props.piece
    if (piece) {
      const key = 'piece_' + piece.pk
      return (
        <Piece
          key={key}
          type={piece.type}
        />
      )
    }
  }

  renderSupplyCenter () {
    const supplyCenter = this.props.supplyCenter
    if (supplyCenter) {
      const key = 'supplyCenter_' + supplyCenter.pk
      return (
        <SupplyCenter
          key={key}
          coastal={this.props.coastal}
        />
      )
    }
  }

  render () {
    return (
      <div
        className={'territory'}
        data-id={this.props.id}
        data-name={this.props.name}
        data-type={this.props.type}
        data-coastal={this.props.coastal}
        data-controlled-by={this.props.controlledBy}
        data-selected={this.props.isSelected}
        data-selected-neighbour={this.props.isSelectedNeighbour}
        onMouseEnter={this._onMouseEnterTerritory.bind(this)}
        onMouseLeave={this._onMouseLeaveTerritory.bind(this)}
        onClick={this._onClickTerritory.bind(this)}
      >
        <span className="name">{this.props.name}</span>
        {this.renderPiece()}
        {this.renderSupplyCenter()}
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
  sharedCoasts: PropTypes.arrayOf(PropTypes.number),
  controlledBy: PropTypes.number,
  supplyCenter: PropTypes.object,
  piece: PropTypes.object,
  isSelected: PropTypes.bool,
  isSelectedNeighbour: PropTypes.bool,
  _onMouseEnterTerritory: PropTypes.func,
  _onMouseLeaveTerritory: PropTypes.func,
  _onClickTerritory: PropTypes.func
}

export default Territory

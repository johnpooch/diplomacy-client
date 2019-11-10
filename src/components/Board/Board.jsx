
import React from 'react'
import PropTypes from 'prop-types'

import './Board.scss'

import Territory from 'Components/Territory/Territory.jsx'

const utils = require('Utilities/utils.js')

class Board extends React.Component {
  renderTerritories () {
    const territories = []

    this.props.data.territories.forEach(obj => {
      let isSelected = false
      let isSelectedNeighbour = false

      if (this.props.selectTarget === obj.pk) {
        isSelected = true
      }

      const neighbours = obj.neighbours || []
      if (neighbours.includes(this.props.selectTarget)) {
        isSelectedNeighbour = true
      }

      const supplyCenter = utils.getObjectByKey(obj.pk, this.props.data.supplyCenters, 'territory')
      const piece = utils.getObjectByKey(obj.pk, this.props.data.pieces, 'territory')

      const key = 'territory_' + obj.pk

      territories.push(
        <Territory
          key={key}
          id={obj.pk}
          name={obj.name}
          type={obj.type}
          coastal={obj.coastal}
          neighbours={obj.neighbours}
          sharedCoasts={obj.shared_coasts}
          controlledBy={obj.controlled_by}
          supplyCenter={supplyCenter}
          piece={piece}
          isSelected={isSelected}
          isSelectedNeighbour={isSelectedNeighbour}
          _onMouseEnterTerritory={this.props._onMouseEnterTerritory}
          _onMouseLeaveTerritory={this.props._onMouseLeaveTerritory}
          _onClickTerritory={this.props._onClickTerritory}
        />
      )
    })

    return territories
  }

  render () {
    return (
      <div className="board">
        {this.renderTerritories()}
      </div>
    )
  }
}

Board.propTypes = {
  data: PropTypes.object,
  selectTarget: PropTypes.number,
  _onMouseEnterTerritory: PropTypes.func,
  _onMouseLeaveTerritory: PropTypes.func,
  _onClickTerritory: PropTypes.func
}

export default Board

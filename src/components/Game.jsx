
import React from 'react'

import './Board.scss'

import territoriesData from '../json/territories.json'
import nationsData from '../json/nations.json'
import piecesData from '../json/pieces.json'
import supplyCentersData from '../json/supply_centers.json'

import Board from './Board.jsx'
import Tooltip from './Tooltip.jsx'
import Orders from './Orders.jsx'

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      player: 1,
      data: {
        nations: {},
        territories: {},
        supplyCenters: {},
        pieces: {}
      },
      isLoaded: false,
      hoverTarget: null,
      selectTarget: null
    }
  }

  componentDidMount () {
    const nations = this.fetchNations()
    const territories = this.fetchTerritories()
    const pieces = this.fetchPieces()
    const supplyCenters = this.fetchSupplyCenters()

    this.setState({
      data: {
        nations: nations,
        territories: territories,
        supplyCenters: supplyCenters,
        pieces: pieces
      },
      isLoaded: true
    })
  }

  fetchPieces () {
    return piecesData.map(obj => {
      const fields = obj.fields
      fields.pk = obj.pk
      return fields
    })
  }

  fetchTerritories () {
    return territoriesData.map(obj => {
      const fields = obj.fields
      fields.pk = obj.pk
      return fields
    })
  }

  fetchNations () {
    return nationsData.map(n => {
      const fields = n.fields
      fields.pk = n.pk
      return fields
    })
  }

  fetchSupplyCenters () {
    return supplyCentersData.map(n => {
      const fields = n.fields
      fields.pk = n.pk
      return fields
    })
  }

  _onMouseEnterTerritory (target) {
    this.setState({
      isHovering: true,
      hoverTarget: target
    })
  }

  _onMouseLeaveTerritory () {
    this.setState({
      isHovering: false,
      hoverTarget: null
    })
  }

  _onClickTerritory (target) {
    if (this.state.selectTarget !== target) {
      this.setState({
        isSelected: true,
        selectTarget: target
      })
    } else {
      this.setState({
        isSelected: false,
        selectTarget: null
      })
    }
  }

  renderBoard () {
    return <Board
      data={this.state.data}
      selectTarget={this.state.selectTarget}
      _onMouseEnterTerritory={this._onMouseEnterTerritory.bind(this)}
      _onMouseLeaveTerritory={this._onMouseLeaveTerritory.bind(this)}
      _onClickTerritory={this._onClickTerritory.bind(this)}
    />
  }

  renderTooltip () {
    if (this.state.hoverTarget) {
      return <Tooltip
        data={this.state.data}
        hoverTarget={this.state.hoverTarget}
      />
    }
  }

  renderOrders () {
    if (this.state.selectTarget) {
      return <Orders
        selectTarget={this.state.selectTarget}
        player={this.state.player}
        data={this.state.data}
      />
    }
  }

  renderLoading () {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  renderGame () {
    return (
      <main className="game">
        {this.renderBoard()}
        {this.renderTooltip()}
        {this.renderOrders()}
      </main>
    )
  }

  render () {
    if (!this.state.isLoaded) {
      return this.renderLoading()
    }

    return this.renderGame()
  }
}

export default Game

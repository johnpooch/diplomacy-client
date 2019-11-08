
import React from 'react'

import './Board.scss'

import territoriesData from '../json/territories.json'
import nationsData from '../json/nations.json'
import piecesData from '../json/pieces.json'
import supplyCentersData from '../json/supply_centers.json'

import Territory from './Territory.jsx'
import Tooltip from './Tooltip.jsx'
import Orders from './Orders.jsx'

class Game extends React.Component {
  constructor (props) {
    super(props)

    const pieces = this.getPieces()
    const territories = this.getTerritories()
    const nations = this.getNations()

    this.state = {
      player: 1,
      pieces: pieces,
      territories: territories,
      nations: nations,
      tooltip: false,
      selected: false,
      selectedNeighbours: []
    }
  }

  getPieces () {
    // remap the json data
    return piecesData.map(p => {
      const fields = p.fields
      fields.pk = p.pk
      return fields
    })
  }

  getTerritories () {
    // remap the json data
    return territoriesData.map(t => {
      const fields = t.fields
      const supplyCenter = this.getSupplyCenterByTerritory(t.pk)

      fields.pk = t.pk
      fields.supplyCenter = !!supplyCenter

      return fields
    })
  }

  getNations () {
    // remap the json data
    return nationsData.map(n => {
      const fields = n.fields
      fields.pk = n.pk
      return fields
    })
  }

  _onMouseEnter (e) {
    const key = this.getTerritoryKeyFromEvent(e)
    const data = this.getTerritoryDataFromKey(key)

    const tooltip = {
      name: data.territory.name,
      type: data.territory.type,
      coastal: data.territory.coastal.toString(),
      supplyCenter: data.territory.supplyCenter.toString()
    }

    if (data.nation) {
      tooltip.nation = data.nation.name
    }

    if (data.piece) {
      tooltip.piece = data.piece.type
    }

    // const neighbours = data.territory.neighbours
    // if (neighbours) {
    //   const neighbourNames = []
    //   neighbours.forEach(key => {
    //     const neighbour = this.getTerritoryByKey(key)
    //     if (neighbour) {
    //       neighbourNames.push(neighbour.name)
    //     }
    //   })
    //   const neighboursString = neighbourNames.join(', ')
    //   tooltip.neighbours = neighboursString
    // }

    this.setState({
      tooltip: tooltip
    })
  }

  _onMouseLeave (e) {
    this.setState({
      tooltip: false
    })
  }

  _onClick (e) {
    const key = this.getTerritoryKeyFromEvent(e)
    const territory = this.getTerritoryByKey(key)
    const selectedNeighbours = territory.neighbours

    if (this.state.selected === key) {
      this.setState({
        selected: false,
        selectedNeighbours: [],
        orders: false
      })
    } else {
      const orders = this.getOrders(key)
      this.setState({
        selected: key,
        selectedNeighbours: selectedNeighbours,
        orders: orders
      })
    }
  }

  getTerritoryKeyFromEvent (e) {
    if (!e) {
      return false
    }

    const territory = e.target.closest('.territory')
    if (!territory) {
      return false
    }

    const key = parseInt(territory.dataset.id)
    return key
  }

  getTerritoryDataFromKey (pk) {
    const key = parseInt(pk)
    const territory = this.getTerritoryByKey(key)

    const data = {
      territory: territory
    }

    if (territory.controlled_by) {
      const nation = this.getNationByKey(territory.controlled_by)

      if (nation) {
        data.nation = nation
      }

      const piece = this.getPieceByTerritory(key)
      if (piece) {
        data.piece = piece
      }
    }

    return data
  }

  getTerritoryByKey (pk) {
    const key = parseInt(pk)
    return this.state.territories.find(obj => { return obj.pk === key })
  }

  getNationByKey (pk) {
    const key = parseInt(pk)
    return this.state.nations.find(obj => { return obj.pk === key })
  }

  getPieceByTerritory (pk) {
    const key = parseInt(pk)
    return this.state.pieces.find(obj => { return obj.territory === key })
  }

  getSupplyCenterByTerritory (pk) {
    const key = parseInt(pk)
    return supplyCentersData.find(obj => { return obj.fields.territory === key })
  }

  renderTerritories () {
    const territories = []

    this.state.territories.forEach(t => {
      const nation = this.getNationByKey(t.controlled_by)
      const piece = this.getPieceByTerritory(t.pk)

      let selection

      if (this.state.selected === t.pk) {
        selection = 'selected'
      } else if (Array.isArray(this.state.selectedNeighbours) &&
                 this.state.selectedNeighbours.includes(t.pk)) {
        selection = 'movable'
      }

      territories.push(
        <Territory
          key={t.pk}
          id={t.pk}
          name={t.name}
          coastal={t.coastal}
          neighbours={t.neighbours}
          shared_coasts={t.shared_coasts}
          type={t.type}
          supplyCenter={t.supplyCenter}
          nation={nation}
          piece={piece}
          selection={selection}
          _onMouseEnter={this._onMouseEnter.bind(this)}
          _onMouseLeave={this._onMouseLeave.bind(this)}
          _onClick={this._onClick.bind(this)}
        />
      )
    })

    return territories
  }

  getOrders (selected) {
    const piece = this.getPieceByTerritory(selected)
    if (!piece) {
      return false
    }

    const territory = this.getTerritoryByKey(selected)
    if (!territory || territory.controlled_by !== this.state.player) {
      return false
    }

    return true
  }

  renderTooltip () {
    if (!this.state.tooltip) {
      return null
    }

    return <Tooltip
      tooltip={this.state.tooltip}
    />
  }

  renderOrders () {
    if (!this.state.orders) {
      return null
    }

    return <Orders
      // orders={this.state.orders}
    />
  }

  render () {
    return (
      <main className="board">
        {this.renderTerritories()}
        {this.renderTooltip()}
        {this.renderOrders()}
      </main>
    )
  }
}

export default Game

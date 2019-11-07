import React from 'react'

import './Board.scss'

// import mapImage from '../images/map.svg'
import territoriesData from '../json/territories.json'
import nationsData from '../json/nations.json'
import piecesData from '../json/pieces.json'

import Territory from './Territory.jsx'
import Tooltip from './Tooltip.jsx'

class Game extends React.Component {
  constructor (props) {
    super(props)

    const pieces = this.getPieces()
    const territories = this.getTerritories()
    const nations = this.getNations()

    this.state = {
      pieces: pieces,
      territories: territories,
      nations: nations,
      tooltip: false,
      player: 1
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
      fields.pk = t.pk
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

  onMouseOver (e) {
    const data = this.getTerritoryDataFromEvent(e)

    const tooltip = {
      name: data.territory.name,
      type: data.territory.type,
      coastal: data.territory.coastal.toString()
    }

    if (data.nation) {
      tooltip.nation = data.nation.name
    }

    if (data.piece) {
      tooltip.piece = data.piece.type
    }

    const neighbours = data.territory.neighbours
    if (neighbours) {
      const neighbourNames = []
      neighbours.forEach(key => {
        const neighbour = this.getTerritoryByKey(key)
        if (neighbour) {
          neighbourNames.push(neighbour.name)
        }
      })
      const neighboursString = neighbourNames.join(', ')
      tooltip.neighbours = neighboursString
    }

    this.setState({
      tooltip: tooltip
    })
  }

  onMouseOut (e) {
    this.setState({
      tooltip: false
    })
  }

  onClick (e) {
    const data = this.getTerritoryDataFromEvent(e)
    console.log(data)
  }

  getTerritoryDataFromEvent (e) {
    if (!e) {
      return
    }

    const el = e.target.closest('.territory')
    if (!el) {
      return
    }

    const key = el.dataset.id
    return this.getTerritoryDataFromKey(key)
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

  renderTerritories () {
    const territories = []

    this.state.territories.forEach(t => {
      const nation = this.getNationByKey(t.controlled_by)
      const piece = this.getPieceByTerritory(t.pk)

      territories.push(
        <Territory
          key={t.pk}
          id={t.pk}
          name={t.name}
          coastal={t.coastal}
          neighbours={t.neighbours}
          shared_coasts={t.shared_coasts}
          type={t.type}
          nation={nation}
          piece={piece}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
          onClick={this.onClick.bind(this)}
        />
      )
    })

    return territories
  }

  renderTooltip () {
    if (!this.state.tooltip) {
      return null
    }

    return <Tooltip
      tooltip={this.state.tooltip}
    />
  }

  render () {
    return (
      <main className="board">
        {this.renderTerritories()}
        {this.renderTooltip()}
      </main>
    )
  }
}

export default Game

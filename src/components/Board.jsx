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
      tooltip: false
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

  hoverStart (e) {
    const territory = e.target.closest('.territory')
    if (!territory) {
      return
    }

    const fields = territory.dataset
    const tooltip = {
      name: fields.name,
      type: fields.type,
      coastal: fields.coastal
    }

    if (fields.nation) {
      const nationKey = parseInt(fields.nation)
      const nation = this.getNationByKey(nationKey)
      tooltip.nation = nation.name

      const territoryKey = parseInt(fields.id)
      const piece = this.getPieceByTerritory(territoryKey)
      if (piece) {
        tooltip.piece = piece.type
      }
    }

    this.setState({
      tooltip: tooltip
    })
  }

  hoverEnd (e) {
    this.setState({
      tooltip: false
    })
  }

  getNationByKey (pk) {
    const nation = this.state.nations.find(n => { return n.pk === pk })
    return nation
  }

  getPieceByTerritory (pk) {
    const piece = this.state.pieces.find(p => { return p.territory === pk })
    return piece
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
          onMouseOver={this.hoverStart.bind(this)}
          onMouseOut={this.hoverEnd.bind(this)}
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

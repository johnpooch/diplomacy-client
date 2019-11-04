import React from 'react'

import './Game.scss'

// import mapImage from '../images/map.svg'
import territoriesData from '../json/territories.json'
import nationsData from '../json/nations.json'
import piecesData from '../json/pieces.json'

import Territory from './Territory.jsx'
// import Piece from './Piece.jsx'

class Game extends React.Component {
  constructor (props) {
    super(props)

    const pieces = this.getPieces()
    const territories = this.getTerritories()
    const nations = this.getNations()

    this.state = {
      pieces: pieces,
      territories: territories,
      nations: nations
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

  renderTerritories () {
    const territories = []

    this.state.territories.forEach(t => {
      const nation = this.getNationByKey(t.controlled_by)
      const piece = this.getPieceByTerritory(t.pk)

      territories.push(
        <Territory
          key={t.pk}
          name={t.name}
          coastal={t.coastal}
          neighbours={t.neighbours}
          shared_coasts={t.shared_coasts}
          type={t.type}
          nation={nation}
          piece={piece}
        />
      )
    })

    return territories
  }

  // renderPieces () {
  //   const pieces = []

  //   this.state.pieces.forEach(p => {
  //     const nation = this.getNationByKey(p.nation)
  //     const territory = this.getTerritoryByKey(p.territory)

  //     pieces.push(
  //       <Piece
  //         key={p.pk}
  //         type={p.type}
  //         territory={territory}
  //         nation={nation}
  //       />
  //     )
  //   })

  //   return pieces
  // }

  getNationByKey (pk) {
    const nation = this.state.nations.find(n => { return n.pk === pk })
    return nation
  }

  // getTerritoryByKey (pk) {
  //   const territory = this.state.territories.find(t => { return t.pk === pk })
  //   return territory
  // }

  getPieceByTerritory (pk) {
    const piece = this.state.pieces.find(p => { return p.territory === pk })
    return piece
  }

  render () {
    return (
      <main className="game">
        {this.renderTerritories()}
        {/* {this.renderPieces()} */}
      </main>
    )
  }
}

export default Game

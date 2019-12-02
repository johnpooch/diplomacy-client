
import React from 'react'
import PropTypes from 'prop-types'

import './Game.scss'

import * as API from '~/api'

import territoriesData from 'JSON/territories.json'
import nationsData from 'JSON/nations.json'
import piecesData from 'JSON/pieces.json'
import supplyCentersData from 'JSON/supply_centers.json'

import GameHeader from 'Components/GameHeader/GameHeader.jsx'
import GameMap from 'Components/GameMap/GameMap.jsx'

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      data: {
        nations: {},
        territories: {},
        supplyCenters: {},
        pieces: {}
      },
      isLoaded: false,
      hoverTarget: null,
      selectTarget: null,
      games: []
    }
  }

  componentDidMount () {
    const nations = this.fetchNations()
    const territories = this.fetchTerritories()
    const pieces = this.fetchPieces()
    const supplyCenters = this.fetchSupplyCenters()

    this.getAllGames()

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

  getAllGames () {
    fetch(API.ALLGAMESURL, {
      method: 'GET',
      headers: this.props.headers
    })
      .then(res => res.json())
      .then((data) => {
        if (!data.length) return

        this.setState({
          games: data.slice()
        })

        // Grab the state for first game
        if (!data.length) return
        const game = data.pop()
        if (typeof game.id !== 'number') return
        this.getGame(game.id)
      })
  }

  getGame (id) {
    const url = API.GAMESTATEURL.replace('<int:game>', id)
    fetch(url, {
      method: 'GET',
      headers: this.props.headers
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({
          game: data
        })
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

  renderLoading () {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  renderHeader () {
    return <GameHeader
      player={this.props.player}
    />
  }

  renderMap () {
    return <GameMap
      data={this.state.data}
    />
  }

  renderGame () {
    return (
      <main className="game">
        {this.renderHeader()}
        {this.renderMap()}
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

Game.propTypes = {
  player: PropTypes.number,
  headers: PropTypes.object
}

export default Game

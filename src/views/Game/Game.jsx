
import React from 'react'
import PropTypes from 'prop-types'

import './Game.scss'

import Alert from 'Components/Alert/Alert.jsx'
import GameHeader from 'Components/GameHeader/GameHeader.jsx'
import GameMap from 'Components/GameMap/GameMap.jsx'
import Loading from 'Components/Loading/Loading.jsx'

import * as API from '~/api'

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      game: undefined,
      isLoaded: false
    }
  }

  componentDidMount () {
    this.getGame(this.props.game)
  }

  getGame (id) {
    const url = API.GAMESTATEURL.replace('<int:game>', id)
    fetch(url, {
      method: 'GET',
      headers: this.props.headers
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw new Error(`Couldn't find game ${id}`)
        }
      })
      .then((json) => {
        console.log(json)
        this.setState({
          game: json,
          isLoaded: true
        })
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          isLoaded: true
        })
      })
  }

  renderHeader () {
    return <GameHeader
      player={this.props.player}
    />
  }

  renderMap () {
    if (!this.state.isLoaded) {
      return <Loading />
    }

    if (!this.state.game) {
      return <Alert text="Game not found" type="error" />
    }

    return <GameMap
      game={this.state.game}
    />
  }

  render () {
    return (
      <div className="game view">
        {this.renderHeader()}
        {this.renderMap()}
      </div>
    )
  }
}

Game.propTypes = {
  player: PropTypes.number,
  headers: PropTypes.object,
  game: PropTypes.number
}

export default Game

// import territoriesData from 'JSON/territories.json'
// import nationsData from 'JSON/nations.json'
// import piecesData from 'JSON/pieces.json'
// import supplyCentersData from 'JSON/supply_centers.json'

// fetchPieces () {
//   return piecesData.map(obj => {
//     const fields = obj.fields
//     fields.pk = obj.pk
//     return fields
//   })
// }

// fetchTerritories () {
//   return territoriesData.map(obj => {
//     const fields = obj.fields
//     fields.pk = obj.pk
//     return fields
//   })
// }

// fetchNations () {
//   return nationsData.map(n => {
//     const fields = n.fields
//     fields.pk = n.pk
//     return fields
//   })
// }

// fetchSupplyCenters () {
//   return supplyCentersData.map(n => {
//     const fields = n.fields
//     fields.pk = n.pk
//     return fields
//   })
// }

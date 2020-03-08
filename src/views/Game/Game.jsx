
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import './Game.scss'

import Alert from 'Components/Alert/Alert.jsx'
import GameMap from 'Components/GameMap/GameMap.jsx'
import Loading from 'Components/Loading/Loading.jsx'

import * as API from '~/api'

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoaded: false
    }
  }

  componentDidMount () {
    try {
      this.getGame(this.props.match.params.id)
    } catch (error) {
      console.error(error)
    }
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
        console.error(error)
        this.setState({
          isLoaded: true
        })
      })
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
        {this.renderMap()}
      </div>
    )
  }
}

Game.propTypes = {
  headers: PropTypes.object,
  match: PropTypes.object
}

export default withRouter(Game)

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

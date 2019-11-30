
import React from 'react'
import PropTypes from 'prop-types'

import './Game.scss'

import * as API from '~/api'

import territoriesData from 'JSON/territories.json'
import nationsData from 'JSON/nations.json'
import piecesData from 'JSON/pieces.json'
import supplyCentersData from 'JSON/supply_centers.json'

import GameHeader from 'Components/GameHeader/GameHeader.jsx'
// import Board from 'Components/Board/Board.jsx'
import Tooltip from 'Components/Tooltip/Tooltip.jsx'
import Orders from 'Components/Orders/Orders.jsx'
import Map from 'Components/Map/Map.jsx'

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
      headers: this.getAuthHeaders('admin', 'admin'),
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
      headers: this.state.headers
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
      headers: this.state.headers
    })
      .then(res => res.json())
      .then((data) => {
        this.setState({
          game: data
        })
        // console.log(data)
      })
  }

  getAuthHeaders (username, password) {
    const headers = new Headers()
    headers.set('Authorization', 'Basic ' + window.btoa(username + ':' + password))
    return headers
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

  // _onMouseEnterTerritory (target) {
  //   this.setState({
  //     isHovering: true,
  //     hoverTarget: target
  //   })
  // }

  // _onMouseLeaveTerritory () {
  //   this.setState({
  //     isHovering: false,
  //     hoverTarget: null
  //   })
  // }

  // _onClickTerritory (target) {
  //   if (this.state.selectTarget !== target) {
  //     this.setState({
  //       isSelected: true,
  //       selectTarget: target
  //     })
  //   } else {
  //     this.setState({
  //       isSelected: false,
  //       selectTarget: null
  //     })
  //   }
  // }

  // renderBoard () {
  //   return <Board
  //     data={this.state.data}
  //     selectTarget={this.state.selectTarget}
  //     _onMouseEnterTerritory={this._onMouseEnterTerritory.bind(this)}
  //     _onMouseLeaveTerritory={this._onMouseLeaveTerritory.bind(this)}
  //     _onClickTerritory={this._onClickTerritory.bind(this)}
  //   />
  // }

  // renderTooltip () {
  //   if (this.state.hoverTarget) {
  //     return <Tooltip
  //       data={this.state.data}
  //       hoverTarget={this.state.hoverTarget}
  //     />
  //   }
  // }

  // renderOrders () {
  //   if (this.state.selectTarget) {
  //     return <Orders
  //       player={this.props.player}
  //       selectTarget={this.state.selectTarget}
  //       data={this.state.data}
  //     />
  //   }
  // }

  renderLoading () {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }

  renderMap () {
    return <Map
      data={this.state.data}
    />
  }

  renderGame () {
    return (
      <main className="game">
        <GameHeader player={this.props.player} />
        {this.renderMap()}
        {/* {this.renderTooltip()} */}
        {/* {this.renderOrders()} */}
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
  player: PropTypes.number
}

export default Game

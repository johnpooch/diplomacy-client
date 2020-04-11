
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
      this.setState({
        isLoaded: true
      })
    }
  }

  getGame (id) {
    const GAMESTATEURL = API.GAMESTATEURL.replace('<int:game>', id)
    fetch(GAMESTATEURL, {
      method: 'GET',
      headers: this.props.headers
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          console.error(`Couldn't find game ${id}`)
        }
      })
      .then((json) => {
        console.log(json)
        this.setState({
          game: json,
          isLoaded: true
        })
      })
  }

  renderMap () {
    if (!this.state.isLoaded) {
      return <Loading />
    }

    if (!this.state.game) {
      return <Alert text="Something went wrong!" type="error" />
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

import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './BrowseGames.scss'
import Alert from 'Components/Alert/Alert.jsx'
import Loading from 'Components/Loading/Loading.jsx'
import * as API from '~/api'

class BrowseGames extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.getAllGames()
  }

  getAllGames () {
    fetch(API.ALLGAMESURL, {
      method: 'GET',
      headers: this.props.headers
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Failed to connect to service')
        }
        return response.json()
      })
      .then((json) => {
        const games = json.length ? json.slice() : []
        this.setState({
          games: games,
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

  getDateDisplayFormat () {
    return {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  }

  renderGamesList () {
    if (!this.state.isLoaded) {
      return <Loading />
    }

    if (!this.state.games || !this.state.games.length) {
      return <Alert text="No games found" type="error" />
    }

    const games = []
    this.state.games.forEach(g => {
      const date = new Date(g.created_at)
      const dateString = date.toLocaleDateString('en-GB', this.getDateDisplayFormat())
      games.push(
        <li
          key={g.id}
          className="game"
          data-id={g.id}
        >
          <Link to={`/game/${g.id}`}>
            <header>
              <span className="name">{g.name}</span>
              <span className="id">{g.id}</span>
            </header>
            <main>
              <p className="created_at">
                <span className="label">Created</span>
                <time dateTime={g.created_at}>{dateString}</time>
              </p>
              <p className="created_by">
                <span className="label">By player</span>
                {g.created_by}
              </p>
              <p className="variant">
                <span className="label">Variant</span>
                {g.variant.name}
              </p>
            </main>
          </Link>
        </li>
      )
    })

    return (
      <ul className="game-list">
        {games}
      </ul>
    )
  }

  render () {
    return (
      <div className="browse-games view">
        <h1>Browse Games</h1>
        {this.renderGamesList()}
      </div>
    )
  }
}

BrowseGames.propTypes = {
  player: PropTypes.number,
  headers: PropTypes.object
}

export default BrowseGames

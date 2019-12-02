import React from 'react'
import PropTypes from 'prop-types'

import './BrowseGames.scss'

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
      .then(res => res.json())
      .then((data) => {
        const games = data.length ? data.slice() : []
        this.setState({
          games: games,
          isLoaded: true
        })
      })
  }

  renderGamesList () {
    if (!this.state.isLoaded) {
      return <Loading />
    }

    if (!this.state.games) {
      return <span>No games found</span>
    }

    const games = []
    this.state.games.forEach(g => {
      const date = new Date(g.created_at)
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      const dateString = date.toLocaleDateString('en-GB', dateOptions)

      games.push(
        <li key={g.id} className="game">
          <p className="name">
            {g.name}
          </p>
          <ul className="details">
            <li className="created_at">
              <span className="label">Created</span>
              <time dateTime={g.created_at}>{dateString}</time>
            </li>
            <li className="created_by">
              <span className="label">Created by player</span>
              {g.created_by}
            </li>
            <li className="variant">
              <span className="label">Variant</span>
              {g.variant.name}
            </li>
          </ul>
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
      <div className="browse-games">
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

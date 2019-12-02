import React from 'react'
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
      return <Alert text="No games found" type="error" />
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
        <li
          key={g.id}
          className="game"
          onClick={this._onClick.bind(this)}
          data-id={g.id}
        >
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
        </li>
      )
    })

    return (
      <ul className="game-list">
        {games}
      </ul>
    )
  }

  _onClick (e) {
    const game = e.target.closest('.game')
    const id = parseInt(game.dataset.id)
    this.props._onClick(id)
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
  _onClick: PropTypes.func,
  player: PropTypes.number,
  headers: PropTypes.object
}

export default BrowseGames

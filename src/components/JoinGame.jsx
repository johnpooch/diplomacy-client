import React, { Component } from 'react';

import Loading from './Loading';
import Players from './PlayerList';
import * as API from '../api';

class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { headers } = this.props;
    if (!event.target.checkValidity()) {
      return;
    }
    const data = new FormData(event.target);
    data.id = userId;
    fetch(API.CREATEGAMEURL, {
      method: 'POST',
      body: data,
      headers,
    }).then((response) => {
      if (response.status === 200) {
        console.log('Joined Game');
        // TODO redirect to my games? or maybe just browse games.
      }
    });
  }

  render() {
    const { game, error, loading } = this.props;
    const players = game.participants;
    if (loading) {
      return <Loading />;
    }
    let errorMessage = null;
    if (error) {
      errorMessage = <p>{error.message}</p>;
    }
    return (
      <div>
        {errorMessage}
        <Players players={players} />

        <form onSubmit={this.handleSubmit}>
          <button type="submit">Join</button>
        </form>
      </div>
    );
  }
}

export default JoinGame;

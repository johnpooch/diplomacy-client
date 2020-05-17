import React, { Component } from 'react';

import Loading from './Loading';
import Heading from './Heading';
import PlayerList from './PlayerList';
import * as API from '../api';
import { PageWrapper, Button } from '../styles';

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
    // data.id = userId;
    fetch(API.CREATEGAMEURL, {
      method: 'POST',
      body: data,
      headers,
    }).then((response) => {
      if (response.status === 200) {
        // console.log('Joined Game');
        // TODO redirect to my games? or maybe just browse games.
      }
    });
  }

  render() {
    const { game, loading } = this.props;
    const players = game.participants;

    console.log(game);

    if (loading) return <Loading />;

    return (
      <PageWrapper>
        <Heading text={game.name} />
        <PlayerList players={players} />
        <form onSubmit={this.handleSubmit}>
          <Button type="submit">Join</Button>
        </form>
      </PageWrapper>
    );
  }
}

export default JoinGame;

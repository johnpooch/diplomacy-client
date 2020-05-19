import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import Heading from './Heading';
import PlayerList from './PlayerList';
import * as API from '../api';
import { PageWrapper, Button } from '../styles';
import alertActions from '../store/actions/alerts';

class JoinGame extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) return;

    const { headers, user, onJoin } = this.props;
    const data = new FormData(event.target);
    data.id = user.id;
    fetch(API.CREATEGAMEURL, {
      method: 'POST',
      body: data,
      headers,
    }).then((response) => {
      if (response.status === 200) {
        onJoin();
        // TODO redirect to my games? or maybe just browse games.
      }
    });
  }

  render() {
    const { game, loading } = this.props;
    const players = game.participants;

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

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onJoin: () =>
      dispatch(
        alertActions.add({
          message: 'Joined game.',
          category: 'success',
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);

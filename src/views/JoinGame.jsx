import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as API from '../api';
import Loading from '../components/Loading';
import Page from '../components/Page';
import PlayerList from '../components/PlayerList';
import alertActions from '../store/actions/alerts';
import { Button, GridTemplate, SecondaryButton } from '../styles';

const NavLinkButton = SecondaryButton.withComponent(NavLink);

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
        // TODO redirect to my games (or browse games)
      }
    });
  }

  render() {
    const { game, loading } = this.props;
    const players = game.participants;

    if (loading) return <Loading />;

    return (
      <Page headingText={game.name}>
        {players.length ? <h2>Players</h2> : null}
        <PlayerList players={players} />
        <GridTemplate templateColumns="auto auto 1fr">
          <form onSubmit={this.handleSubmit}>
            <Button type="submit">Join game</Button>
          </form>
          <NavLinkButton to="/">Cancel</NavLinkButton>
        </GridTemplate>
      </Page>
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

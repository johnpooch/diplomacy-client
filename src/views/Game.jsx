import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Error from './Error';
import JoinGame from './JoinGame';
import PlayGame from './PlayGame';
import * as API from '../api';
import gameService from '../services/game';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      playerOrders: null,
    };
    this.refreshPlayerOrders = this.refreshPlayerOrders.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.getGameAndOrders(match.params.id);
  }

  getGameAndOrders(id) {
    const { token } = this.props;
    const fetchGame = gameService.getGame(token, id);
    const fetchOrders = gameService.listPlayerOrders(token, id);
    Promise.all([fetchGame, fetchOrders])
      .then(([game, playerOrders]) => {
        this.setState({
          game,
          playerOrders,
          isLoaded: true,
        });
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
        });
      });
  }

  static getCurrentTurn(game) {
    const { turns } = game;
    for (let i = 0; i < turns.length; i += 1) {
      if (turns[i].current_turn === true) {
        return turns[i];
      }
    }
    return null;
  }

  refreshPlayerOrders(id) {
    const { token } = this.props;
    gameService.listPlayerOrders(token, id).then((playerOrders) => {
      this.setState({
        playerOrders,
      });
    });
  }

  render() {
    const { isLoaded, game, playerOrders } = this.state;

    if (isLoaded) {
      if (!game) return <Error text="Game not found" />;

      const { status } = game;
      if (status === 'active') {
        // TODO handle already joined
        return (
          <PlayGame
            game={game}
            playerOrders={playerOrders}
            refreshPlayerOrders={this.refreshPlayerOrders}
          />
        );
      }
    }

    return <JoinGame game={game} isLoaded={isLoaded} />;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    token: state.login.token,
  };
};

export default connect(mapStateToProps, null)(withRouter(Game));

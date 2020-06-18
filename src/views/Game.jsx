import React from 'react';
import { withRouter } from 'react-router-dom';

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
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getGame(match.params.id);
  }

  getGame(id) {
    const { token } = this.props;
    gameService
      .getGame(token, id)
      .then((game) => {
        this.setState({
          game,
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

  render() {
    const { isLoaded, game } = this.state;

    if (isLoaded) {
      if (!game) return <Error text="Game not found" />;

      const { status } = game;
      if (status === 'active') {
        // TODO handle already joined
        return <PlayGame game={game} />;
      }
    }

    return <JoinGame game={game} isLoaded={isLoaded} />;
  }
}

export default withRouter(Game);

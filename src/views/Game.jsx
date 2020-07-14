import React from 'react';
import { withRouter } from 'react-router-dom';

import Error from './Error';
import JoinGame from './JoinGame';
import PlayGame from './PlayGame';
import * as API from '../api';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getGame(match.params.slug);
  }

  // TODO move to service
  getGame(slug) {
    const { headers } = this.props;
    const GAMESTATEURL = API.GAMESTATEURL.replace('<game>', slug);
    fetch(GAMESTATEURL, {
      method: 'GET',
      headers,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json) => {
        const game = json;
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

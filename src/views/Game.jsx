import React from 'react';
import { withRouter } from 'react-router-dom';

import Error from './Error';
import Map from '../components/Map';
import Loading from '../components/Loading';
import TurnNav from '../components/TurnNav';
import JoinGame from '../components/JoinGame';
import * as API from '../api';
import * as Utils from '../utils';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      activeTurn: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getGame(match.params.id);
  }

  // TODO move to service
  getGame(id) {
    const { headers } = this.props;
    const GAMESTATEURL = API.GAMESTATEURL.replace('<int:game>', id);
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
        const currentTurn = Game.getCurrentTurn(game);

        this.setState({
          game,
          activeTurn: currentTurn,
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

  getTurn(id) {
    const { game } = this.state;
    const { turns } = game;
    return Utils.getObjectByKey(id, turns, 'id');
  }

  setTurn(id) {
    this.setState({
      activeTurn: this.getTurn(id),
    });
  }

  renderMap() {
    const { game, activeTurn } = this.state;
    return <Map game={game} turn={activeTurn} />;
  }

  renderTurnNav() {
    const { game, activeTurn } = this.state;
    const { turns } = game;
    if (turns) {
      return (
        <TurnNav
          turns={turns}
          activeTurn={activeTurn}
          _click={(id) => {
            this.setTurn(id);
          }}
        />
      );
    }
    return null;
  }

  render() {
    const { isLoaded, game } = this.state;

    if (!isLoaded) return <Loading />;

    if (!game) return <Error text="Game not found" />;

    const { status } = game;
    if (status === 'pending') {
      // handle already joined!
      return <JoinGame game={game} />;
    }

    return (
      <div>
        {this.renderMap()}
        {this.renderTurnNav()}
      </div>
    );
  }
}

export default withRouter(Game);

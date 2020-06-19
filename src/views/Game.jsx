import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../components/Loading';
import Error from './Error';
import PreGame from './PreGame';
import PlayGame from './PlayGame';
import gameService from '../services/game';
import alertActions from '../store/actions/alerts';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      playerOrders: null,
      privateNationState: null,
    };
    this.toggleJoinGame = this.toggleJoinGame.bind(this);
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

  toggleJoinGame() {
    this.setState({ isLoaded: false });
    const { user, token, onJoin, onLeave } = this.props;
    const { game } = this.state;
    const { id, name } = game;

    const players = game ? game.participants : [];
    const playerIds = players.map((p) => p.id);
    const joining = !playerIds.includes(user.id);

    gameService.joinGame(token, id).then(() => {
      const alertFunction = joining ? onJoin : onLeave;
      alertFunction(name);
      this.getGame(id);
    });
  }

  render() {
    const { isLoaded, game, playerOrders, privateNationState } = this.state;
    const { user } = this.props;

    if (!isLoaded) {
      return <Loading />;
    }
    if (!game) return <Error text="Game not found" />;

    const { status } = game;
    if (status === 'active') {
      return (
        <PlayGame
          game={game}
          playerOrders={playerOrders}
          privateNationState={privateNationState}
        />
      );
    }
    return (
      <PreGame
        game={game}
        isLoaded={isLoaded}
        toggleJoinGame={this.toggleJoinGame}
        user={user}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    token: state.login.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onJoin: (name) =>
      dispatch(
        alertActions.add({
          message: `Joined "${name}"! The game will begin once all players have joined.`,
          category: 'success',
        })
      ),
    onLeave: (name) =>
      dispatch(
        alertActions.add({
          message: `You have left "${name}".`,
          category: 'success',
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Game));

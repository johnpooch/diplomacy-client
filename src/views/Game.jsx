import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GameAdapter from '../adapters/GameAdapter';
import Loading from '../components/Loading';
import Map from '../components/Map';
import StatusBar from '../components/StatusBar';
import gameService from '../services/game';
import * as Utils from '../utils';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isProcessing: false,
      activeTurn: null,
      playerOrders: null,
      privateNationState: null,
    };
    this.getPrivate = this.getPrivate.bind(this);
    this.finalizeOrders = this.finalizeOrders.bind(this);
  }

  componentDidMount() {
    const { gameData } = this.props;
    const { turns } = gameData;
    const currentTurnIndex = turns.findIndex(
      (obj) => obj.current_turn === true
    );
    const activeTurn = turns[currentTurnIndex];
    this.setState({ activeTurn });
    const { slug } = gameData;
    this.getPrivate(slug);
  }

  getPrivate(slug) {
    /* Get the player's current orders and nation state. This should not be
     * seen by other players. */
    this.setState({ isProcessing: true });
    const { token } = this.props;
    const fetchOrders = gameService.listPlayerOrders(token, slug);
    const fetchPrivateNationState = gameService.retrievePrivateNationState(
      token,
      slug
    );
    Promise.all([fetchOrders, fetchPrivateNationState])
      .then(([playerOrders, privateNationState]) => {
        this.setState({
          playerOrders,
          privateNationState,
          isLoaded: true,
          isProcessing: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
          isProcessing: false,
        });
      });
  }

  getTurn(id) {
    const { gameData } = this.props;
    const { turns } = gameData;
    return Utils.getObjectByKey(id, turns, 'id');
  }

  setTurn(id) {
    this.setState({
      activeTurn: this.getTurn(id),
    });
  }

  finalizeOrders(nationStateId, slug) {
    const { token } = this.props;
    this.setState({ isProcessing: true });
    gameService.toggleFinalizeOrders(token, nationStateId).then(() => {
      this.getPrivate(slug);
      this.setState({
        isProcessing: false,
      });
    });
  }

  render() {
    const {
      activeTurn,
      isLoaded,
      isProcessing,
      playerOrders,
      privateNationState,
    } = this.state;
    const { gameData, user } = this.props;
    if (!isLoaded) {
      return <Loading />;
    }
    const { id } = activeTurn;
    const game = new GameAdapter(id, user, gameData, playerOrders);
    return (
      <div>
        <Map
          game={game}
          turn={activeTurn}
          playerOrders={playerOrders}
          privateNationState={privateNationState}
          getPrivate={this.getPrivate}
        />
        <StatusBar
          game={game}
          privateNationState={privateNationState}
          finalizeOrders={this.finalizeOrders}
          turn={activeTurn}
          isProcessing={isProcessing}
          _setTurn={(_id) => {
            this.setTurn(_id);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, null)(withRouter(Game));

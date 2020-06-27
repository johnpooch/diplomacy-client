import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    const { game } = this.props;
    const { turns } = game;
    const currentTurnIndex = turns.findIndex(
      (obj) => obj.current_turn === true
    );
    const activeTurn = turns[currentTurnIndex];
    this.setState({ activeTurn });
    const { id } = game;
    this.getPrivate(id);
  }

  getPrivate(id) {
    /* Get the player's current orders and nation state. This should not be
     * seen by other players. */
    this.setState({ isProcessing: true });
    const { token } = this.props;
    const fetchOrders = gameService.listPlayerOrders(token, id);
    const fetchPrivateNationState = gameService.retrievePrivateNationState(
      token,
      id
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
    const { game } = this.props;
    const { turns } = game;
    return Utils.getObjectByKey(id, turns, 'id');
  }

  setTurn(id) {
    this.setState({
      activeTurn: this.getTurn(id),
    });
  }

  finalizeOrders(nationStateId, gameId) {
    const { token } = this.props;
    this.setState({ isProcessing: true });
    gameService.toggleFinalizeOrders(token, nationStateId).then(() => {
      this.getPrivate(gameId);
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
    const { game } = this.props;
    if (!isLoaded) {
      return <Loading />;
    }
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
          _setTurn={(id) => {
            this.setTurn(id);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    token: state.login.token,
  };
};

export default connect(mapStateToProps, null)(withRouter(Game));

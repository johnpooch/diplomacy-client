import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Loading from '../components/Loading';
import Map from '../components/Map';
import StatusBar from '../components/StatusBar';
import gameService from '../services/game';
import { IconButton } from '../styles';
import { spacing } from '../variables';
import * as Utils from '../utils';

const StyledCloseButton = styled(IconButton)`
  position: fixed;
  top: ${spacing[2]}px;
  right: ${spacing[2]}px;
`.withComponent(NavLink);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
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
    this.setState({ isLoaded: false });
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
        });
      })
      .catch(() => {
        this.setState({
          isLoaded: true,
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
    this.setState({ isLoaded: false });
    gameService.toggleFinalizeOrders(token, nationStateId).then(() => {
      this.getPrivate(gameId);
      this.setState({
        isLoaded: true,
      });
    });
  }

  render() {
    const {
      activeTurn,
      isLoaded,
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
        <StyledCloseButton to="/">
          <FontAwesomeIcon icon={faTimes} />
        </StyledCloseButton>
        <StatusBar
          game={game}
          privateNationState={privateNationState}
          finalizeOrders={this.finalizeOrders}
          turn={activeTurn}
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

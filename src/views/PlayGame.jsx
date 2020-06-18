import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Map from '../components/Map';
import PlayerStatus from '../components/PlayerStatus';
import TurnNav from '../components/TurnNav';
import { IconButton } from '../styles';
import { spacing } from '../variables';
import * as Utils from '../utils';

const StyledIconButton = styled(IconButton)`
  position: fixed;
  top: ${spacing[2]}px;
  right: ${spacing[2]}px;
`;

const StyledNavLink = StyledIconButton.withComponent(NavLink);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTurn: null,
      userNationState: null,
    };
  }

  componentDidMount() {
    const { game, user } = this.props;
    const { turns } = game;
    const currentTurnIndex = turns.findIndex(
      (obj) => obj.current_turn === true
    );
    const activeTurn = turns[currentTurnIndex];
    const userNationState = activeTurn.nation_states.find((nationState) => {
      return nationState.user.id === user.id;
    });
    this.setState({ activeTurn, userNationState });
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

  renderMap() {
    const { activeTurn } = this.state;
    const { game, playerOrders, refreshPlayerOrders } = this.props;
    return (
      <Map
        game={game}
        turn={activeTurn}
        playerOrders={playerOrders}
        refreshPlayerOrders={refreshPlayerOrders}
      />
    );
  }

  renderTurnNav() {
    const { activeTurn } = this.state;
    if (activeTurn) {
      return (
        <TurnNav
          turn={activeTurn}
          _click={(id) => {
            this.setTurn(id);
          }}
        />
      );
    }
    return null;
  }

  static renderBackButton() {
    return (
      <StyledNavLink to="/">
        <FontAwesomeIcon icon={faTimes} />
      </StyledNavLink>
    );
  }

  render() {
    const { userNationState } = this.state;
    return (
      <div>
        {this.renderMap()}
        <PlayerStatus userNationState={userNationState} />
        {this.renderTurnNav()}
        {Game.renderBackButton()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};

export default connect(mapStateToProps, null)(withRouter(Game));

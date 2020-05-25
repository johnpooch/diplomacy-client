import React from 'react';
import styled from '@emotion/styled';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Map from '../components/Map';
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
      currentTurnIndex: null,
    };
  }

  componentDidMount() {
    const { game } = this.props;
    const { turns } = game;
    const currentTurnIndex = turns.findIndex(
      (obj) => obj.current_turn === true
    );
    this.setState({
      activeTurn: turns[currentTurnIndex],
      currentTurnIndex,
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

  renderMap() {
    const { activeTurn } = this.state;
    const { game } = this.props;
    return <Map game={game} turn={activeTurn} />;
  }

  renderTurnNav() {
    const { activeTurn, currentTurnIndex } = this.state;
    const { game } = this.props;
    const { turns } = game;
    if (turns && activeTurn) {
      return (
        <TurnNav
          turns={turns}
          activeTurn={activeTurn}
          currentTurnIndex={currentTurnIndex}
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
    return (
      <div>
        {this.renderMap()}
        {this.renderTurnNav()}
        {Game.renderBackButton()}
      </div>
    );
  }
}

export default withRouter(Game);

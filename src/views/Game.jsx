import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from '@emotion/styled';

import Error from './Error';
import Map from '../components/Map';
import Loading from '../components/Loading';
import * as API from '../api';
import * as Utils from '../utils';
import { colors, spacing, fontSizes } from '../variables';

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${colors.gray};
  color: ${colors.base};
  padding: ${spacing[2]}px;

  ul {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
  }

  li {
    &:not(:first-of-type) {
      margin-right: ${spacing[2]}px;
    }

    &[data-selected='true'] span {
      font-weight: bold;
    }
  }

  button {
    padding: ${spacing[1]}px;
    font-size: ${fontSizes.sans.small}px;
  }

  span {
    text-transform: capitalize;

    &:not(:last-of-type):after {
      content: ' ';
    }
  }

  .phase {
    display: none;
  }
`;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      selectedTurn: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.getGame(match.params.id);
  }

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
          selectedTurn: currentTurn,
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
      selectedTurn: this.getTurn(id),
    });
  }

  renderGame() {
    const { game, selectedTurn } = this.state;
    return <Map game={game} turn={selectedTurn} />;
  }

  renderTurnNav() {
    const { game, selectedTurn } = this.state;
    const { turns } = game;
    if (turns) {
      const turnElements = [];
      turns.forEach((turn) => {
        const isSelected = selectedTurn.id === turn.id;
        turnElements.push(
          <li key={turn.id} data-selected={isSelected}>
            <button
              type="button"
              onClick={() => {
                this.setTurn(turn.id);
              }}
            >
              <span className="season">{turn.season}</span>
              <span className="year">{turn.year}</span>
              <span className="phase">{turn.phase}</span>
            </button>
          </li>
        );
      });
      return (
        <StyledNav>
          <ul>{turnElements}</ul>
        </StyledNav>
      );
    }
    return null;
  }

  render() {
    const { isLoaded, game } = this.state;
    if (!isLoaded) return <Loading />;
    if (!game) return <Error text="Game not found" />;
    return (
      <div>
        {this.renderGame()}
        {this.renderTurnNav()}
      </div>
    );
  }
}

export default withRouter(Game);

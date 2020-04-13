import React from 'react';
import styled from '@emotion/styled';

import ScrollableSVG from './ScrollableSVG';
import Territory from './Territory';
import Piece from './Piece';
import mapData from '../map.json';
import * as Utils from '../utils';
import { colors, sizes } from '../variables';

const StyledDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: calc(100vh - ${sizes.navHeight}px);
  background: ${colors.sea};

  > svg {
    width: 100%;
    height: 100%;
  }
`;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: null,
    };
  }

  componentDidMount() {
    const turn = this.getCurrentTurn();
    this.setState({
      turn,
    });
    console.log(turn);
  }

  getCurrentTurn() {
    const { game } = this.props;
    const { turns } = game;

    for (let i = 0; i < turns.length; i += 1) {
      if (turns[i].current_turn === true) {
        return turns[i];
      }
    }

    return null;
  }

  renderTerritories() {
    const { turn } = this.state;
    if (!turn) return null;

    const { game } = this.props;
    const { territories } = game.variant;
    const states = turn.territory_states;

    const territoriesList = [];
    territories.forEach((territory) => {
      const { id } = territory;
      const state = Utils.getObjectByKey(id, states, 'territory');
      const controller = state ? state.controlled_by : null;
      territoriesList.push(
        <Territory
          key={id}
          id={id}
          name={territory.name}
          type={territory.type}
          controlledBy={controller}
          supplyCenter={territory.supply_center}
        />
      );
    });

    return territoriesList;
  }

  renderPieces() {
    const { turn } = this.state;
    if (!turn) return null;

    const { game } = this.props;
    const { pieces } = game;
    const states = turn.piece_states;

    const piecesList = [];
    states.forEach((state) => {
      const piece = Utils.getObjectByKey(state.piece, pieces, 'id');
      piecesList.push(
        <Piece
          key={piece.id}
          type={piece.type}
          nation={piece.nation}
          territory={state.territory}
        />
      );
    });
    return piecesList;
  }

  render() {
    return (
      <StyledDiv>
        <ScrollableSVG
          viewBoxWidth={mapData.viewBoxWidth}
          viewBoxHeight={mapData.viewBoxHeight}
        >
          <g className="territories">{this.renderTerritories()}</g>
          <g className="pieces">{this.renderPieces()}</g>
        </ScrollableSVG>
      </StyledDiv>
    );
  }
}

export default Map;

import React from 'react';
import styled from '@emotion/styled';

import ScrollableSVG from './ScrollableSVG';
import Territory from './Territory';
import Piece from './Piece';
import Tooltip from './Tooltip';
import { headerHeight } from './Header';
import mapData from '../map.json';
import * as Utils from '../utils';
import { colors } from '../variables';

const StyledDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: calc(100vh - ${headerHeight}px);
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
      hovering: null,
      mousePos: {
        x: 0,
        y: 0,
      },
    };
  }

  componentDidMount() {
    const turn = this.getCurrentTurn();
    this.setState({
      turn,
    });
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

  getTerritoryState(id) {
    const { turn } = this.state;
    const territoryStates = turn.territory_states;
    return Utils.getObjectByKey(id, territoryStates, 'territory');
  }

  getNation(id) {
    const { game } = this.props;
    const { nations } = game.variant;
    return Utils.getObjectByKey(id, nations, 'id');
  }

  getPiece(id) {
    const { game } = this.props;
    const { pieces } = game;
    return Utils.getObjectByKey(id, pieces, 'id');
  }

  getPieceInTerritory(id) {
    const { turn } = this.state;
    const pieceStates = turn.piece_states;
    const pieceState = Utils.getObjectByKey(id, pieceStates, 'territory');
    if (pieceState) {
      return this.getPiece(pieceState.piece);
    }
    return null;
  }

  renderTerritories() {
    const { turn } = this.state;
    if (!turn) return null;

    const { game } = this.props;
    const { territories } = game.variant;

    const updateMousePos = (e) => {
      this.setState({
        mousePos: {
          x: e.nativeEvent.clientX,
          y: e.nativeEvent.clientY,
        },
      });
    };

    const territoriesList = [];
    territories.forEach((territory) => {
      const { id } = territory;
      const territoryState = this.getTerritoryState(id);
      const controlledBy = territoryState ? territoryState.controlled_by : null;
      territoriesList.push(
        <Territory
          key={id}
          id={id}
          name={territory.name}
          type={territory.type}
          controlledBy={controlledBy}
          supplyCenter={territory.supply_center}
          _mouseMove={(e) => {
            updateMousePos(e);
          }}
          _mouseOver={(e, hovering) => {
            updateMousePos(e);
            this.setState({
              hovering,
            });
          }}
          _mouseOut={() => {
            this.setState({
              hovering: null,
            });
          }}
        />
      );
    });

    return territoriesList;
  }

  renderPieces() {
    const { turn } = this.state;
    const pieceStates = turn.piece_states;

    const piecesList = [];
    pieceStates.forEach((state) => {
      const piece = this.getPiece(state.piece);
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

  renderTooltip() {
    const { hovering, mousePos } = this.state;

    const territoryState = this.getTerritoryState(hovering);
    const piece = this.getPieceInTerritory(hovering);

    const territoryControlledBy = territoryState
      ? this.getNation(territoryState.controlled_by)
      : null;
    const pieceControlledBy = piece ? this.getNation(piece.nation) : null;

    if (hovering) {
      return (
        <Tooltip
          mousePos={mousePos}
          territoryState={territoryState}
          territoryControlledBy={territoryControlledBy}
          piece={piece}
          pieceControlledBy={pieceControlledBy}
        />
      );
    }
    return null;
  }

  render() {
    const { turn } = this.state;
    if (!turn) return null;
    return (
      <StyledDiv>
        <ScrollableSVG
          viewBoxWidth={mapData.viewBoxWidth}
          viewBoxHeight={mapData.viewBoxHeight}
        >
          <rect
            x={0}
            y={0}
            width={mapData.viewBoxWidth}
            height={mapData.viewBoxHeight}
            fill="white"
          />
          <g className="territories">{this.renderTerritories()}</g>
          <g className="pieces">{this.renderPieces()}</g>
        </ScrollableSVG>
        {this.renderTooltip()}
      </StyledDiv>
    );
  }
}

export default Map;

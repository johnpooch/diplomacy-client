/* eslint camelcase: [2, { "allow": ["territory_data", "piece_x", "piece_y", "piece_states"] }] */
import React from 'react';
import styled from '@emotion/styled';

import Orders from './Orders';
import Piece from './Piece';
import ScrollableSVG from './ScrollableSVG';
import Territory from './Territory';
import Tooltip from './Tooltip';
import { getObjectByKey } from '../utils';
import { colors } from '../variables';

const StyledDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: ${colors.base};
  top: 0;
  cursor: ${(props) => (props.panning ? 'all-scroll' : 'pointer')};
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  > svg {
    width: 100%;
    height: 100%;
  }
`;

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interacting: false,
      panning: false,
      selected: null,
      summary: null,
      hovering: null,
      tooltip: null,
      clickPos: null,
      mousePos: null,
    };

    this.resetPan = this.resetPan.bind(this);

    this.PANNING_THRESHOLD = 5;
  }

  getNation(id) {
    const { game } = this.props;
    const { nations } = game.variant;
    return getObjectByKey(id, nations, 'id');
  }

  getPiece(id) {
    const { game } = this.props;
    const { pieces } = game;
    return getObjectByKey(id, pieces, 'id');
  }

  getPieceInTerritory(id) {
    const { turn } = this.props;
    const pieceStates = turn.piece_states;
    const pieceState = getObjectByKey(id, pieceStates, 'territory');
    return pieceState ? this.getPiece(pieceState.piece) : null;
  }

  getTerritory(id) {
    const { game } = this.props;
    const { territories } = game.variant;
    return getObjectByKey(id, territories, 'id');
  }

  getTerritoryState(id) {
    const { turn } = this.props;
    const territoryStates = turn.territory_states;
    return getObjectByKey(id, territoryStates, 'territory');
  }

  getTerritoryControlledBy(id) {
    const territoryState = this.getTerritoryState(id);
    return territoryState ? this.getNation(territoryState.controlled_by) : null;
  }

  getTerritorySummary(id) {
    const piece = this.getPieceInTerritory(id);
    const territory = this.getTerritory(id);
    const territoryControlledBy = this.getTerritoryControlledBy(id);
    const pieceControlledBy = piece ? this.getNation(piece.nation) : null;
    return {
      territory,
      piece,
      territoryControlledBy,
      pieceControlledBy,
    };
  }

  checkPanDistance() {
    const { clickPos, mousePos } = this.state;
    if (!clickPos || !mousePos) return;

    const { x: x1, y: y1 } = clickPos;
    const { x: x2, y: y2 } = mousePos;
    const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    if (d > this.PANNING_THRESHOLD) {
      this.setState({
        panning: true,
      });
    }
  }

  resetPan() {
    this.setState({
      interacting: false,
      panning: false,
      clickPos: null,
      mousePos: null,
    });
  }

  renderTerritories(territory_data) {
    const { turn } = this.props;
    if (!turn) return null;
    const territoriesList = [];
    territory_data.forEach((data) => {
      const { hovering, interacting, panning, selected } = this.state;
      const id = data.territory;
      const territory = this.getTerritory(id);
      const controlledBy = this.getTerritoryControlledBy(id);
      if (data && territory) {
        territoriesList.push(
          <Territory
            key={data.pk}
            id={id}
            data={data}
            type={territory.type}
            supplyCenter={territory.supply_center}
            controlledBy={controlledBy}
            hovering={hovering === id}
            selected={selected === id}
            interacting={interacting}
            _mouseOver={() => {
              if (interacting) return;
              this.setState({
                hovering: id,
              });
            }}
            _mouseOut={() => {
              if (interacting) return;
              this.setState({
                hovering: null,
                tooltip: null,
              });
            }}
            _mouseUp={(e) => {
              if (e.nativeEvent.which !== 1) return;
              if (panning) return;
              if (selected !== id) {
                this.setState({
                  selected: id,
                  summary: this.getTerritorySummary(id),
                });
              } else {
                this.setState({
                  selected: null,
                  summary: null,
                });
              }
            }}
            _contextMenu={(e) => {
              e.nativeEvent.preventDefault();
              this.setState({
                tooltip: this.getTerritorySummary(id),
              });
            }}
          />
        );
      }
    });

    return <g transform="translate(-195, -170)">{territoriesList}</g>;
  }

  renderPieces(territory_data) {
    const { turn } = this.props;
    const { piece_states } = turn;
    const elements = [];
    piece_states.forEach((state) => {
      const piece = this.getPiece(state.piece);
      const data = getObjectByKey(state.territory, territory_data, 'territory');
      const { piece_x, piece_y } = data;
      elements.push(
        <Piece
          key={piece.id}
          type={piece.type}
          nation={piece.nation}
          territory={state.territory}
          x={piece_x}
          y={piece_y}
        />
      );
    });
    return <g>{elements}</g>;
  }

  renderTooltip() {
    const { tooltip, interacting } = this.state;
    if (!tooltip) return null;
    return <Tooltip summary={tooltip} interacting={interacting} />;
  }

  renderOrders() {
    const { selected, summary } = this.state;
    if (!selected) return null;
    return (
      <Orders
        summary={summary}
        selected={selected}
        _onClickHold={() => {
          console.log('hold');
          // TODO send hold order to API
          this.setState({
            selected: null,
            summary: null,
          });
        }}
        _onClickMove={() => {
          console.log('move');
          // TODO select where to move, then send move order to API
        }}
        _onClickSupport={() => {
          console.log('support');
          // TODO select where to support, then send support order to API
        }}
        _onClickConvoy={() => {
          console.log('convoy');
          // TODO select where to convoy, then send support order to API
        }}
      />
    );
  }

  render() {
    const { game, turn } = this.props;
    if (!turn) return null;
    const { interacting, panning } = this.state;
    const mapData = game.variant.map_data[0];
    const { territory_data } = mapData;
    return (
      <StyledDiv
        panning={panning}
        onMouseMove={(e) => {
          if (interacting && !panning) {
            this.setState({
              mousePos: {
                x: e.nativeEvent.clientX,
                y: e.nativeEvent.clientY,
              },
            });
            this.checkPanDistance();
          }
        }}
        onMouseDown={(e) => {
          if (e.nativeEvent.which !== 1) return;
          this.setState({
            interacting: true,
            panning: false,
            tooltip: null,
            clickPos: {
              x: e.nativeEvent.clientX,
              y: e.nativeEvent.clientY,
            },
          });
        }}
        onMouseUp={this.resetPan}
        onMouseLeave={this.resetPan}
      >
        <ScrollableSVG
          viewBoxWidth={mapData.width}
          viewBoxHeight={mapData.height}
          interacting={interacting}
          panning={panning}
        >
          {this.renderTerritories(territory_data)}
          {this.renderPieces(territory_data)}
        </ScrollableSVG>
        {this.renderTooltip(territory_data)}
        {this.renderOrders()}
      </StyledDiv>
    );
  }
}

export default Map;

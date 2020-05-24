/* eslint camelcase: [2, { "allow": ["territory_data", "piece_x", "piece_y"] }] */
import React from 'react';
import styled from '@emotion/styled';

import ScrollableSVG from './ScrollableSVG';
import Territory from './Territory';
import Piece from './Piece';
import Tooltip from './Tooltip';
import { getObjectByKey } from '../utils';
import { colors } from '../variables';

const StyledDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: ${colors.base};
  top: 0;

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
      hovering: null,
      tooltip: null,
    };

    this.TOOLTIP_DELAY = 250;
    this.tooltipTimeout = null;
  }

  componentWillUnmount() {
    this.clearTooltipTimeout();
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
    if (pieceState) {
      return this.getPiece(pieceState.piece);
    }
    return null;
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

  clearTooltipTimeout() {
    window.clearTimeout(this.tooltipTimeout);
    this.tooltipTimeout = null;
  }

  startTooltipTimeout() {
    const { interacting } = this.state;
    this.clearTooltipTimeout();
    if (interacting) return;
    this.tooltipTimeout = setTimeout(
      this.updateTooltip.bind(this),
      this.TOOLTIP_DELAY
    );
  }

  updateTooltip() {
    const { hovering } = this.state;

    if (!hovering) {
      this.setState({
        tooltip: null,
      });
      return;
    }

    const piece = this.getPieceInTerritory(hovering);
    const territory = this.getTerritory(hovering);
    const territoryControlledBy = this.getTerritoryControlledBy(hovering);
    const pieceControlledBy = piece ? this.getNation(piece.nation) : null;

    const tooltip = {
      territory,
      piece,
      territoryControlledBy,
      pieceControlledBy,
    };

    this.setState({
      tooltip,
    });
  }

  renderTerritories(territory_data) {
    const { turn } = this.props;
    if (!turn) return null;
    const territoriesList = [];
    territory_data.forEach((data) => {
      const { hovering, interacting } = this.state;
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
            interacting={interacting}
            _mouseOver={(hoveringId) => {
              if (interacting) return;
              this.setState({
                hovering: hoveringId,
              });
              this.startTooltipTimeout();
            }}
            _mouseOut={() => {
              if (interacting) return;
              this.setState({
                hovering: null,
                tooltip: null,
              });
              this.clearTooltipTimeout();
            }}
          />
        );
      }
    });

    return (
      <g className="territories" transform="translate(-195, -170)">
        {territoriesList}
      </g>
    );
  }

  renderPieces(territory_data) {
    const { turn } = this.props;
    const pieceStates = turn.piece_states;

    const piecesList = [];
    pieceStates.forEach((state) => {
      const piece = this.getPiece(state.piece);
      const data = getObjectByKey(state.territory, territory_data, 'territory');
      const { piece_x, piece_y } = data;
      piecesList.push(
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
    return <g className="pieces">{piecesList}</g>;
  }

  renderTooltip() {
    const { tooltip, interacting } = this.state;
    if (tooltip) {
      return <Tooltip tooltip={tooltip} interacting={interacting} />;
    }
    return null;
  }

  render() {
    const { game, turn } = this.props;
    if (!turn) return null;
    const { interacting } = this.state;
    const mapData = game.variant.map_data[0];
    const { territory_data } = mapData;
    return (
      <StyledDiv
        onMouseMove={() => {
          this.startTooltipTimeout();
        }}
        onMouseDown={() => {
          this.clearTooltipTimeout();
          this.setState({
            interacting: true,
            tooltip: null,
          });
        }}
        onMouseUp={() => {
          this.startTooltipTimeout();
          this.setState({
            interacting: false,
          });
        }}
        onMouseLeave={() => {
          this.setState({
            interacting: false,
          });
        }}
      >
        <ScrollableSVG
          viewBoxWidth={mapData.width}
          viewBoxHeight={mapData.height}
          interacting={interacting}
        >
          {this.renderTerritories(territory_data)}
          {this.renderPieces(territory_data)}
        </ScrollableSVG>
        {this.renderTooltip(territory_data)}
      </StyledDiv>
    );
  }
}

export default Map;

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
  background: ${colors.sea};
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

  getTerritories() {
    const { game, turn } = this.props;
    const outData = [];
    const allTerritoryMapData = game.variant.map_data[0].territory_data;
    allTerritoryMapData.forEach((territoryMapData) => {
      const flatTerritory = territoryMapData;
      flatTerritory.type = 'impassable';
      flatTerritory.controlledBy = null;
      if (territoryMapData.territory) {
        const territoryId = territoryMapData.territory;
        const { territories } = game.variant;
        const territoryStates = turn.territory_states;
        const territory = getObjectByKey(territoryId, territories, 'id');
        const territoryState = getObjectByKey(
          territoryId,
          territoryStates,
          'territory'
        );
        flatTerritory.type = territory.type;
        flatTerritory.supplyCenter = territory.supply_center;
        flatTerritory.controlledBy = territoryState.controlled_by;
      }
      outData.push(flatTerritory);
    });
    return outData;
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

    const territoryState = this.getTerritoryState(hovering);
    const territoryControlledBy = territoryState
      ? this.getNation(territoryState.controlled_by)
      : null;
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

  renderTerritories() {
    const { turn } = this.props;
    if (!turn) return null;
    const territories = this.getTerritories();
    const territoriesList = [];
    territories.forEach((territory) => {
      const { hovering, interacting } = this.state;
      territoriesList.push(
        <Territory
          key={territory.pk}
          territory={territory}
          hovering={hovering === territory.territory}
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
    });

    return territoriesList;
  }

  renderPieces() {
    const { game, turn } = this.props;
    const pieceStates = turn.piece_states;

    const mapData = game.variant.map_data[0];
    const { territory_data } = mapData;

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
    return piecesList;
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
          <rect
            x={0}
            y={0}
            width={mapData.width}
            height={mapData.height}
            fill={colors.base}
          />
          <g className="territories" transform="translate(-195, -170)">
            {this.renderTerritories()}
          </g>
          <g className="pieces">{this.renderPieces()}</g>
        </ScrollableSVG>
        {this.renderTooltip()}
      </StyledDiv>
    );
  }
}

export default Map;

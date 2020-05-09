import React from 'react';
import styled from '@emotion/styled';

import ScrollableSVG from './ScrollableSVG';
import Territory from './Territory';
import Piece from './Piece';
import Tooltip from './Tooltip';
import { getObjectByKey } from '../utils';
import { colors, sizes } from '../variables';

const StyledDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: calc(100vh - ${sizes.headerHeight}px);
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
      interacting: false,
      hovering: null,
      tooltip: null,
      mousePos: {
        x: 0,
        y: 0,
      },
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

  getPieceInTerritory(id) {
    const { turn } = this.props;
    const pieceStates = turn.piece_states;
    const pieceState = getObjectByKey(id, pieceStates, 'territory');
    if (pieceState) {
      return this.getPiece(pieceState.piece);
    }
    return null;
  }

  updateMousePos(e) {
    this.setState({
      mousePos: {
        x: e.nativeEvent.clientX,
        y: e.nativeEvent.clientY,
      },
    });
  }

  updateTooltip() {
    const { hovering } = this.state;

    if (!hovering) {
      this.setState({
        tooltip: null,
      });
      return;
    }

    const { mousePos } = this.state;

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
      pos: mousePos,
    };

    this.setState({
      tooltip,
    });
  }

  clearTooltipTimeout() {
    window.clearTimeout(this.tooltipTimeout);
    this.tooltipTimeout = null;
  }

  startTooltipTimeout() {
    this.clearTooltipTimeout();
    this.tooltipTimeout = setTimeout(
      this.updateTooltip.bind(this),
      this.TOOLTIP_DELAY
    );
  }

  renderTerritories() {
    const { game, turn } = this.props;
    if (!turn) return null;

    const mapData = game.variant.map_data[0];
    const territories = mapData.territory_data;

    const territoriesList = [];
    territories.forEach((territoryMapData) => {
      const { hovering, interacting } = this.state;
      const {
        pk,
        territory: territoryId,
        abbreviation,
        name,
        text_x: textX,
        text_y: textY,
        path,
        supply_center_x: supplyCenterX,
        supply_center_y: supplyCenterY,
      } = territoryMapData;
      const territoryState = this.getTerritoryState(territoryId);
      const territory = this.getTerritory(territoryId);
      const controlledBy = territoryState ? territoryState.controlled_by : null;
      const type = 'impassable';
      const supplyCenter = false;
      if (territory) {
        const { supply_center: supplyCenter, type } = territory;
      }
      territoriesList.push(
        <Territory
          abbreviation={abbreviation}
          name={name}
          type={type}
          key={pk}
          id={pk}
          textX={textX}
          textY={textY}
          path={path}
          controlledBy={controlledBy}
          supplyCenter={supplyCenter}
          supplyCenterX={supplyCenterX}
          supplyCenterY={supplyCenterY}
          hovering={hovering === pk}
          interacting={interacting}
          _mouseOver={(hoverTerritory) => {
            this.setState({
              hovering: hoverTerritory,
            });
            this.startTooltipTimeout();
          }}
          _mouseOut={() => {
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
    const { territory_data: territoryData } = mapData;

    const piecesList = [];
    pieceStates.forEach((state) => {
      const piece = this.getPiece(state.piece);
      const data = getObjectByKey(state.territory, territoryData, 'territory');
      const { piece_x: x, piece_y: y } = data;
      piecesList.push(
        <Piece
          key={piece.id}
          type={piece.type}
          nation={piece.nation}
          territory={state.territory}
          x={x}
          y={y}
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
    const mapData = game.variant.map_data;
    return (
      <StyledDiv
        onMouseEnter={(e) => {
          this.updateMousePos(e);
        }}
        onMouseMove={(e) => {
          this.updateMousePos(e);
          if (!interacting) {
            this.startTooltipTimeout();
          }
          this.setState({
            tooltip: null,
          });
        }}
        onMouseDown={() => {
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
            fill={colors.sea}
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

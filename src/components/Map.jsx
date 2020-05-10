import React from 'react';
import styled from '@emotion/styled';

import ScrollableSVG from './ScrollableSVG';
import Territory from './Territory';
import Piece from './Piece';
import Tooltip from './Tooltip';
import mapData from '../map.json';
import * as Utils from '../utils';
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
    return Utils.getObjectByKey(id, nations, 'id');
  }

  getPiece(id) {
    const { game } = this.props;
    const { pieces } = game;
    return Utils.getObjectByKey(id, pieces, 'id');
  }

  getTerritory(id) {
    const { game } = this.props;
    const { territories } = game.variant;
    return Utils.getObjectByKey(id, territories, 'id');
  }

  getTerritoryState(id) {
    const { turn } = this.props;
    const territoryStates = turn.territory_states;
    return Utils.getObjectByKey(id, territoryStates, 'territory');
  }

  getPieceInTerritory(id) {
    const { turn } = this.props;
    const pieceStates = turn.piece_states;
    const pieceState = Utils.getObjectByKey(id, pieceStates, 'territory');
    if (pieceState) {
      return this.getPiece(pieceState.piece);
    }
    return null;
  }

  updateTooltip(e) {
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

  renderTerritories() {
    const { turn } = this.props;
    if (!turn) return null;

    const { game } = this.props;
    const { territories } = game.variant;

    const territoriesList = [];
    territories.forEach((territory) => {
      const { hovering, interacting } = this.state;
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
    });

    return territoriesList;
  }

  renderPieces() {
    const { turn } = this.props;
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
    const { tooltip, interacting } = this.state;
    if (tooltip) {
      return <Tooltip tooltip={tooltip} interacting={interacting} />;
    }
    return null;
  }

  render() {
    const { turn } = this.props;
    if (!turn) return null;
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

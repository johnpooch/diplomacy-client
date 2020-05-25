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
      clickable: false,
      selected: null,
      summary: null,
      hovering: null,
      tooltip: null,
    };

    this.TOOLTIP_DELAY = 300;
    this.CLICK_DELAY = 200;

    this.tooltipTimeout = null;
    this.clickTimeout = null;
  }

  componentWillUnmount() {
    this.clearTooltipTimeout();
    this.clearClickTimeout();
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

  clearTooltipTimeout() {
    window.clearTimeout(this.tooltipTimeout);
    this.tooltipTimeout = null;
  }

  startTooltipTimeout() {
    const { interacting } = this.state;
    this.clearTooltipTimeout();
    if (interacting) return;
    this.tooltipTimeout = setTimeout(
      this.handleTooltipTimeout.bind(this),
      this.TOOLTIP_DELAY
    );
  }

  handleTooltipTimeout() {
    const { hovering } = this.state;
    if (!hovering) {
      this.setState({
        tooltip: null,
      });
    } else {
      this.setState({
        tooltip: this.getTerritorySummary(hovering),
      });
    }
  }

  clearClickTimeout() {
    window.clearTimeout(this.clickTimeout);
    this.clickTimeout = null;
  }

  startClickTimeout() {
    this.setState({
      clickable: true,
    });
    this.clearClickTimeout();
    this.clickTimeout = setTimeout(
      this.handleClickTimeout.bind(this),
      this.CLICK_DELAY
    );
  }

  handleClickTimeout() {
    this.setState({
      clickable: false,
    });
  }

  renderTerritories(territory_data) {
    const { turn } = this.props;
    if (!turn) return null;
    const territoriesList = [];
    territory_data.forEach((data) => {
      const { hovering, interacting, selected } = this.state;
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
            _mouseDown={() => {
              this.startClickTimeout();
            }}
            _click={(e, clickId) => {
              const { clickable } = this.state;
              if (clickable) {
                this.setState({
                  selected: clickId,
                  summary: this.getTerritorySummary(clickId),
                });
              }
              this.clearClickTimeout();
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
    return <Orders summary={summary} selected={selected} />;
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
          this.clearClickTimeout();
          this.setState({
            interacting: true,
            tooltip: null,
            selected: null,
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
        {this.renderOrders()}
      </StyledDiv>
    );
  }
}

export default Map;

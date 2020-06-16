/* eslint camelcase: [2, { "allow": ["territory_data", "piece_x", "piece_y", "piece_states"] }] */
import React from 'react';
import styled from '@emotion/styled';

import ArrowheadMarker from './ArrowheadMarker';
import OrderArrow from './OrderArrow';
import OrderConfirmation from './OrderConfirmation';
import OrderMessage from './OrderMessage';
import OrderSelector from './OrderSelector';
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
  background-color: ${colors.gray};
  top: 0;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  cursor: ${(props) => (props.panning ? 'all-scroll' : 'initial')};

  svg {
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
      hovering: null,
      tooltip: null,
      clickPos: null,
      mousePos: null,
      order: {
        type: null,
        aux: null,
        source: null,
        target: null,
      },
    };
    this.resetPan = this.resetPan.bind(this);
    this.resetOrder = this.resetOrder.bind(this);

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

  static getTerritoryIdFromSummary(summary) {
    if (summary) return summary.territory.id;
    return null;
  }

  postOrder() {
    // Hold - source
    // Move - source, target, target_coast=None, via_convoy=False
    // Support - source, aux, target
    // Convoy - source, aux, target
    // Retreat - source, target, target_coast=None
    // Build - source, target_coast=None
    // Disband - source
    const { order } = this.state;
    const { type, aux, source, target } = order;
    const auxId = Map.getTerritoryIdFromSummary(aux);
    const sourceId = Map.getTerritoryIdFromSummary(source);
    const targetId = Map.getTerritoryIdFromSummary(target);
    console.log('order:', type, sourceId, auxId, targetId);
    this.resetOrder();
  }

  resetOrder() {
    this.setState({
      order: {
        type: null,
        aux: null,
        source: null,
        target: null,
      },
    });
  }

  resetPan() {
    this.setState({
      interacting: false,
      panning: false,
      clickPos: null,
      mousePos: null,
    });
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

  clickTerritory(id) {
    const { order } = this.state;
    const { aux, source, target, type } = order;
    const summary = this.getTerritorySummary(id);
    const sourceId = Map.getTerritoryIdFromSummary(source);
    switch (type) {
      case 'move':
        if (!target) {
          this.setState({
            order: {
              ...order,
              target: summary,
            },
          });
        }
        break;

      case 'support':
      case 'convoy':
        if (!aux) {
          this.setState({
            order: {
              ...order,
              aux: summary,
            },
          });
          break;
        }
        if (!target) {
          this.setState({
            order: {
              ...order,
              target: summary,
            },
          });
        }
        break;

      default:
        if (sourceId === id) {
          this.resetOrder();
          break;
        }
        this.setState({
          order: {
            source: summary,
          },
        });
        break;
    }
  }

  renderTerritories(territory_data) {
    const { turn } = this.props;
    if (!turn) return null;
    const territoriesList = [];
    territory_data.forEach((data) => {
      const { hovering, interacting, order, panning } = this.state;
      const id = data.territory;
      const territory = this.getTerritory(id);
      const controlledBy = this.getTerritoryControlledBy(id);
      const { aux, source, target } = order;
      if (data && territory) {
        territoriesList.push(
          <Territory
            key={data.pk}
            id={id}
            data={data}
            type={territory.type}
            supplyCenter={territory.supply_center}
            controlledBy={controlledBy}
            panning={panning}
            hovering={hovering === id}
            interacting={interacting}
            isSource={Map.getTerritoryIdFromSummary(source) === id}
            isAux={Map.getTerritoryIdFromSummary(aux) === id}
            isTarget={Map.getTerritoryIdFromSummary(target) === id}
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
              this.clickTerritory(id);
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

  renderOrderArrows(territory_data) {
    const { turn } = this.props;
    const { orders } = turn;
    const elements = [];
    orders.forEach((order) => {
      const { id, nation, source, target, type } = order;
      const sourceData = getObjectByKey(source, territory_data, 'territory');
      const { piece_x: x1, piece_y: y1 } = sourceData;
      const targetData = getObjectByKey(target, territory_data, 'territory');
      const { piece_x: x2, piece_y: y2 } = targetData;
      elements.push(
        <OrderArrow
          key={id}
          id={id}
          type={type}
          nation={nation}
          x1={x1}
          x2={x2}
          y1={y1}
          y2={y2}
          offsetSize={26}
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

  renderOrderConfirmation() {
    const { order } = this.state;
    return (
      <OrderConfirmation
        order={order}
        _onClickConfirm={() => {
          console.log('confirm');
          this.postOrder();
        }}
        _onClickCancel={() => {
          console.log('cancel');
          this.resetOrder();
        }}
      />
    );
  }

  renderOrderMessage() {
    const { order } = this.state;
    const { aux, target, type } = order;
    switch (type) {
      case 'hold':
        return this.renderOrderConfirmation();

      case 'move':
        if (!target) {
          return <OrderMessage text="Select a territory to move into" />;
        }
        return this.renderOrderConfirmation();

      case 'support':
        if (!aux) {
          return <OrderMessage text="Select a territory to support from" />;
        }
        if (!target) {
          return <OrderMessage text="Select a territory to support into" />;
        }
        return this.renderOrderConfirmation();

      case 'convoy':
        if (!aux) {
          return <OrderMessage text="Select a territory to convoy from" />;
        }
        if (!target) {
          return <OrderMessage text="Select a territory to convoy into" />;
        }
        return this.renderOrderConfirmation();

      default:
        return null;
    }
  }

  renderOrder() {
    const { order } = this.state;
    const { type, source } = order;

    if (!type && source) {
      return (
        <OrderSelector
          summary={source}
          onClickCancel={this.resetOrder}
          _onClickHold={() => {
            console.log('hold');
            this.setState({
              order: {
                ...order,
                type: 'hold',
              },
            });
          }}
          _onClickMove={() => {
            console.log('move');
            this.setState({
              order: {
                ...order,
                type: 'move',
              },
            });
          }}
          _onClickSupport={() => {
            console.log('support');
            this.setState({
              order: {
                ...order,
                type: 'support',
              },
            });
          }}
          _onClickConvoy={() => {
            console.log('convoy');
            this.setState({
              order: {
                ...order,
                type: 'convoy',
              },
            });
          }}
        />
      );
    }

    return this.renderOrderMessage();
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
          <defs>
            <ArrowheadMarker
              id="arrow-move"
              fill="white"
              width={3}
              height={3}
            />
          </defs>
          <rect
            width={mapData.width}
            height={mapData.height}
            fill={colors.base}
          />
          {this.renderTerritories(territory_data)}
          {this.renderOrderArrows(territory_data)}
          {this.renderPieces(territory_data)}
        </ScrollableSVG>
        {this.renderTooltip(territory_data)}
        {this.renderOrder()}
      </StyledDiv>
    );
  }
}

export default Map;

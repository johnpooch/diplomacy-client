/* eslint camelcase: [2, { "allow": ["territory_data", "piece_x", "piece_y", "piece_states", "piece_type"] }] */
import React from 'react';
import { connect } from 'react-redux';

import styled from '@emotion/styled';

import ArrowheadMarker from './ArrowheadMarker';
import AuxArrow from './AuxArrow';
import BuildOrder from './BuildOrder';
import TargetArrow from './TargetArrow';
import OrderDialogue from './OrderDialogue';
import Piece from './Piece';
import ScrollableSVG from './ScrollableSVG';
import Territory from './Territory';
import Tooltip from './Tooltip';
import { getObjectByKey } from '../utils';
import { colors } from '../variables';

import gameService from '../services/game';

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
      orderDialogueActive: false,
      order: {
        type: null,
        aux: null,
        source: null,
        target: null,
      },
    };
    this.resetPan = this.resetPan.bind(this);
    this.resetOrder = this.resetOrder.bind(this);
    this.onClickOrderTypeChoice = this.onClickOrderTypeChoice.bind(this);
    this.onClickPieceTypeChoice = this.onClickPieceTypeChoice.bind(this);
    this.onClickConfirm = this.onClickConfirm.bind(this);
    this.onClickCancelOrder = this.onClickCancelOrder.bind(this);

    this.PANNING_THRESHOLD = 5;
  }

  onClickOrderTypeChoice(choice) {
    const { order } = this.state;
    this.setState({
      order: {
        ...order,
        type: choice,
      },
    });
  }

  onClickPieceTypeChoice(choice) {
    const { order } = this.state;
    this.setState({
      order: {
        ...order,
        piece_type: choice,
      },
    });
  }

  getCurrentTurn() {
    const { game } = this.props;
    const { turns } = game;
    const currentTurnIndex = turns.findIndex(
      (obj) => obj.current_turn === true
    );
    return turns[currentTurnIndex];
  }

  getNation(id) {
    const { game } = this.props;
    const { nations } = game.variant;
    return getObjectByKey(id, nations, 'id');
  }

  getUserNationState(userId) {
    const currentTurn = this.getCurrentTurn();
    return currentTurn.nation_states.find((nationState) => {
      return nationState.user.id === userId;
    });
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

  getDislodgedPieceInTerritory(id) {
    const { turn } = this.props;
    const pieceStates = turn.piece_states;
    const dislodgedPieceState = pieceStates.find((pieceState) => {
      return pieceState.territory === id && pieceState.must_retreat;
    });
    return dislodgedPieceState
      ? this.getPiece(dislodgedPieceState.piece)
      : null;
  }

  getPieceStateInTerritory(territoryId) {
    const { turn } = this.props;
    const pieceStates = turn.piece_states;
    return getObjectByKey(territoryId, pieceStates, 'territory');
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

  getOrderTypeChoices(source) {
    const { turn } = this.props;
    const { piece, territory } = source;
    const { type: territoryType } = territory;
    if (turn.phase === 'Order') {
      const options = ['hold', 'move', 'support'];
      const { type: pieceType } = piece;
      if (pieceType === 'fleet' && territoryType === 'sea') {
        options.push('convoy');
      }
      return options;
    }
    if (turn.phase === 'Retreat and Disband') {
      const options = ['retreat', 'disband'];
      return options;
    }
    return ['build'];
  }

  onClickConfirm() {
    this.postOrder();
  }

  onClickCancelOrder(orderId) {
    const { game, token, getPrivate } = this.props;
    const { id: gameId } = game;
    gameService.destroyOrder(token, gameId, orderId).then(() => {
      getPrivate(gameId);
    });
    this.resetOrder();
  }

  getPieceTypeChoices(source) {
    const { turn } = this.props;
    const { territory } = source;
    const { type: territoryType } = territory;
    if (turn.phase === 'Build') {
      const options = ['army'];
      if (territoryType === 'coastal') {
        options.push('fleet');
      }
      return options;
    }
    return [];
  }

  resetOrder() {
    this.setState({
      orderDialogueActive: false,
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

  postOrder() {
    // Hold - source
    // Move - source, target, target_coast=None, via_convoy=False
    // Support - source, aux, target
    // Convoy - source, aux, target
    // Retreat - source, target, target_coast=None
    // Build - source, target_coast=None
    // Disband - source
    const { order } = this.state;
    const { game, token, getPrivate } = this.props;
    const { id: gameId } = game;
    let { aux, source, target } = order;
    const { type, piece_type } = order;
    aux = Map.getTerritoryIdFromSummary(aux);
    source = Map.getTerritoryIdFromSummary(source);
    target = Map.getTerritoryIdFromSummary(target);
    const data = { type, source, target, aux, piece_type };
    gameService.createOrder(token, gameId, data).then(() => {
      getPrivate(gameId);
    });
    this.resetOrder();
  }

  getOrder(territoryId) {
    const { playerOrders } = this.props;
    return getObjectByKey(territoryId, playerOrders, 'source');
  }

  userCanOrder(territoryId) {
    /* Determine whether a user can create an order for the given territory */
    const { user, turn, privateNationState } = this.props;
    if (!user) {
      return false;
    }
    const userNationState = this.getUserNationState(user.id);
    if (!userNationState) {
      // User is not controlling a nation in the game.
      return false;
    }
    const currentTurn = this.getCurrentTurn();
    if (currentTurn !== turn) {
      // Cannot order if not looking at current turn
      return false;
    }

    // Orders turn
    if (currentTurn.phase === 'Order') {
      const piece = this.getPieceInTerritory(territoryId);
      if (!piece) {
        return false;
      }
      const pieceBelongsToUser = piece.nation === userNationState.nation.id;
      return pieceBelongsToUser;
    }

    // Retreat turn
    if (currentTurn.phase === 'Retreat and Disband') {
      const pieceState = this.getDislodgedPieceInTerritory(territoryId);
      return Boolean(pieceState);
    }

    // Build turn
    const piece = this.getPieceInTerritory(territoryId);
    const {
      num_orders_remaining: ordersRemaining,
      supply_delta: supplyDelta,
      build_territories: buildTerritories,
    } = privateNationState;
    if (piece) {
      return false;
    }
    if (supplyDelta > 0) {
      // player can build
      if (!ordersRemaining) {
        return Boolean(this.getOrder(territoryId));
      }
      return buildTerritories.includes(territoryId);
    }
    // player must disband
    if (!piece) {
      return false;
    }
    return false;
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
        if (!this.userCanOrder(id)) {
          return;
        }
        this.setState({
          order: {
            ...order,
            source: summary,
          },
          orderDialogueActive: true,
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

  renderOrders(orders, territory_data) {
    const elements = [];
    orders.forEach((order) => {
      const { id, nation, source, target, aux, type } = order;
      const sourceData = getObjectByKey(source, territory_data, 'territory');
      const { piece_x: x, piece_y: y } = sourceData;
      if (type === 'build') {
        elements.push(<BuildOrder key={id} order={order} x={x} y={y} />);
      }
      if (target) {
        const { piece_x: x1, piece_y: y1 } = sourceData;
        const targetData = getObjectByKey(target, territory_data, 'territory');
        const { piece_x: x2, piece_y: y2 } = targetData;
        elements.push(
          <TargetArrow
            key={`move-${id}`}
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
      }
      if (aux) {
        const { piece_x: x1, piece_y: y1 } = sourceData;
        const auxData = getObjectByKey(aux, territory_data, 'territory');
        const { piece_x: x2, piece_y: y2 } = auxData;
        elements.push(
          <AuxArrow
            key={`aux-${id}`}
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
      }
    });
    return elements;
  }

  renderTooltip() {
    const { tooltip, interacting } = this.state;
    if (!tooltip) return null;
    return <Tooltip summary={tooltip} interacting={interacting} />;
  }

  render() {
    const { game, playerOrders, turn } = this.props;
    if (!turn) return null;
    const { order, interacting, panning, orderDialogueActive } = this.state;
    const mapData = game.variant.map_data[0];
    const { territory_data } = mapData;

    const renderOrderDialogue = () => {
      if (!orderDialogueActive) {
        return null;
      }
      const { source } = order;
      const orderTypeChoices = this.getOrderTypeChoices(source);
      const pieceTypeChoices = this.getPieceTypeChoices(source);
      const { territory } = source;
      const { id: territoryId } = territory;
      const existingOrder = this.getOrder(territoryId);
      return (
        <OrderDialogue
          onClickCancel={this.resetOrder}
          onClickOrderTypeChoice={this.onClickOrderTypeChoice}
          onClickPieceTypeChoice={this.onClickPieceTypeChoice}
          onClickConfirm={this.onClickConfirm}
          onClickCancelOrder={this.onClickCancelOrder}
          orderTypeChoices={orderTypeChoices}
          pieceTypeChoices={pieceTypeChoices}
          order={order}
          existingOrder={existingOrder}
        />
      );
    };

    let { orders } = turn;
    if (turn === this.getCurrentTurn()) {
      orders = playerOrders;
    }
    const orderArrows = this.renderOrders(orders, territory_data);

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
          {orderArrows}
          {this.renderPieces(territory_data)}
        </ScrollableSVG>
        {this.renderTooltip(territory_data)}
        {renderOrderDialogue()}
      </StyledDiv>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    token: state.login.token,
  };
};

export default connect(mapStateToProps, null)(Map);

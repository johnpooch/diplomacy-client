import React from 'react';
import { connect } from 'react-redux';

import styled from '@emotion/styled';

import ArrowheadMarker from './ArrowheadMarker';
import OrderDialogue from './OrderDialogue';
import Orders from './Orders';
import Pieces from './Pieces';
import ScrollableSVG from './ScrollableSVG';
import Territories from './Territories';
import Tooltip from './Tooltip';
import { colors } from '../variables';

import gameService from '../services/game';

const StyledDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: ${colors.gray};
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

    const { game } = props;
    this.state = {
      game,
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
    this.getTerritoryCallbacks = this.getTerritoryCallbacks.bind(this);
    this.getTerritoryOrderState = this.getTerritoryOrderState.bind(this);

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
        pieceType: choice,
      },
    });
  }

  onClickConfirm() {
    this.postOrder();
  }

  onClickCancelOrder(orderId) {
    const { game, token, getPrivate } = this.props;
    const { slug } = game;
    gameService.destroyOrder(token, slug, orderId).then(() => {
      getPrivate(slug);
    });
    this.resetOrder();
  }

  // TODO move to territory adapter
  getOrderTypeChoices(territory) {
    const { turn } = this.props;
    const { piece } = territory;
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

  // TODO move to territory adapter
  getPieceTypeChoices(territory) {
    const { turn } = this.props;
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
    const { slug } = game;
    let { aux, source, target } = order;
    const { type, pieceType } = order;
    if (aux) {
      aux = aux.id;
    }
    if (source) {
      source = source.id;
    }
    if (target) {
      target = target.id;
    }
    const data = { type, source, target, aux, pieceType };
    gameService.createOrder(token, slug, data).then(() => {
      getPrivate(slug);
    });
    this.resetOrder();
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

  clickTerritory(id) {
    const { game, order } = this.state;
    const { aux, source, target, type } = order;
    const territory = game.getTerritory(id);
    if (!territory) {
      // non-playable territory clicked
      return;
    }
    switch (type) {
      case 'retreat':
      case 'move':
        if (!target) {
          this.setState({
            order: {
              ...order,
              target: territory,
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
              aux: territory,
            },
          });
          break;
        }
        if (!target) {
          this.setState({
            order: {
              ...order,
              target: territory,
            },
          });
        }
        break;

      default:
        if (source) {
          if (source.id === id) {
            this.resetOrder();
            break;
          }
        }
        if (!game.userCanOrder(territory)) {
          this.setState({
            tooltip: territory,
          });
          break;
        }
        this.setState({
          order: {
            ...order,
            source: territory,
          },
          orderDialogueActive: true,
        });
        break;
    }
  }

  getTerritoryCallbacks(id) {
    const { interacting, panning } = this.state;
    const { game } = this.props;
    const territory = game.getTerritory(id);
    const mouseOut = () => {
      if (interacting) return;
      this.setState({
        hovering: null,
        tooltip: null,
      });
    };
    const mouseOver = () => {
      if (interacting) return;
      this.setState({
        hovering: id,
      });
    };
    const mouseUp = (e) => {
      if (e.nativeEvent.which !== 1) return;
      if (panning) return;
      this.clickTerritory(id);
    };
    const contextMenu = (e) => {
      e.nativeEvent.preventDefault();
      this.setState({
        tooltip: territory,
      });
    };
    return { mouseOut, mouseOver, mouseUp, contextMenu };
  }

  getTerritoryOrderState(id) {
    // TODO could this be written more elegantly?
    const { order } = this.state;
    const { aux, source, target } = order;
    if (source && source.id === id) {
      return 'source';
    }
    if (aux && aux.id === id) {
      return 'aux';
    }
    if (target && target.id === id) {
      return 'target';
    }
    return null;
  }

  render() {
    const { game, turn } = this.props;
    const { mapData, orders } = game;
    const pieces = game.getPieces();
    if (!turn) return null;
    const {
      hovering,
      interacting,
      order,
      orderDialogueActive,
      panning,
      tooltip,
    } = this.state;
    const { territories } = game;

    const renderOrderDialogue = () => {
      if (!orderDialogueActive) {
        return null;
      }
      const { source } = order;
      const orderTypeChoices = this.getOrderTypeChoices(source);
      const pieceTypeChoices = this.getPieceTypeChoices(source);
      const { id: territoryId } = source;
      const existingOrder = game.getOrder(territoryId);
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
          game={game}
          existingOrder={existingOrder}
        />
      );
    };

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
          <Territories
            getCallbacks={this.getTerritoryCallbacks}
            getTerritoryOrderState={this.getTerritoryOrderState}
            hovering={hovering}
            panning={panning}
            territories={territories}
          />
          <Orders orders={orders} />
          <Pieces pieces={pieces} />
        </ScrollableSVG>
        <Tooltip territory={tooltip} game={game} />
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

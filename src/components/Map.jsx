import React, { useState } from 'react';

import styled from '@emotion/styled';

import ArrowheadMarker from './ArrowheadMarker';
import OrderDialogue from './OrderDialogue';
import Orders from './Orders';
import ScrollableSVG from './ScrollableSVG';
import Territories from './Territories';
import Tooltip from './Tooltip';
import { colors } from '../variables';
import { orderUtils } from '../utils';

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

const Map = (props) => {
  const { createOrder, game, turn } = props;
  const { orders, territories, userNation } = turn;
  const { mapData } = game.variant;

  const PANNING_THRESHOLD = 5;
  const initialOrderState = {
    type: null,
    aux: null,
    source: null,
    target: null,
    targetCoast: null,
  };

  const [panning, setPanning] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const [hovering, setHovering] = useState(null);
  const [clickPos, setClickPos] = useState(null);
  const [mousePos, setMousePos] = useState(null);

  const [order, setOrder] = useState(initialOrderState);

  const updateOrderState = (key, value) => {
    setOrder({ ...order, [key]: value });
  };

  const clickTerritory = (id) => {
    const { source } = order;
    const territory = territories.find((t) => t.id === id && t.territory);
    // Non-playable territory clicked
    if (!territory) return;

    if (!source && !orderUtils.userCanOrder(turn, territory)) return;
    const attr = orderUtils.getOrderAttrToUpdate(order);
    updateOrderState(attr, territory);
  };

  const getTerritoryCallbacks = (id) => {
    const territory = territories.find((t) => t.id === id);
    const mouseOut = () => {
      if (interacting) return;
      setHovering(null);
      setTooltip(null);
    };
    const mouseOver = () => {
      if (!interacting) setHovering(id);
    };
    const mouseUp = (e) => {
      if (e.nativeEvent.which !== 1) return;
      if (!panning) clickTerritory(id);
    };
    const contextMenu = (e) => {
      e.nativeEvent.preventDefault();
      setTooltip(territory);
    };
    return { mouseOut, mouseOver, mouseUp, contextMenu };
  };

  const getTerritoryOrderState = (id) => {
    // TODO could this be written more elegantly?
    const { aux, source, target } = order;
    if (!id) return null;
    if (source === id) {
      return 'source';
    }
    if (aux === id) {
      return 'aux';
    }
    if (target === id) {
      return 'target';
    }
    return null;
  };

  const checkPanDistance = () => {
    if (!clickPos || !mousePos) return;

    const { x: x1, y: y1 } = clickPos;
    const { x: x2, y: y2 } = mousePos;
    const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    if (d > PANNING_THRESHOLD) {
      setPanning(true);
    }
  };

  const onMouseDown = (e) => {
    if (e.nativeEvent.which !== 1) return;
    setInteracting(true);
    setPanning(false);
    setTooltip(null);
    setClickPos({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  };

  const onMouseMove = (e) => {
    if (interacting && !panning) {
      setClickPos({
        x: e.nativeEvent.clientX,
        y: e.nativeEvent.clientY,
      });
      checkPanDistance();
    }
  };

  const resetPan = () => {
    setInteracting(false);
    setPanning(false);
    setClickPos(null);
    setMousePos(null);
  };

  const orderTypeChoices = (() => {
    const { source } = order;
    if (!source) return null;
    if (!source.piece) return null;
    const { type: territoryType } = source;
    // TODO use constants
    if (turn.phase === 'Order') {
      const options = ['hold', 'move', 'support'];
      const { type: pieceType } = source.piece;
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
  })();

  const pieceTypeChoices = (() => {
    const { source } = order;
    if (source && turn.phase === 'Build')
      return source.type === 'coastal' ? ['army', 'fleet'] : ['army'];
    return null;
  })();

  const onClickOrderTypeChoice = (type) => {
    updateOrderState('type', type);
  };

  const getOrderIds = () => {
    const aux = order.aux ? order.aux.id : null;
    const source = order.source ? order.source.id : null;
    const target = order.target ? order.target.id : null;
    const targetCoast = order.targetCoast ? order.targetCoast.id : null;
    return [aux, source, target, targetCoast];
  };

  const postOrder = () => {
    const [aux, source, target, targetCoast] = getOrderIds();
    const { type, pieceType } = order;
    const data = {
      type,
      source,
      target,
      aux,
      pieceType,
      target_coast: targetCoast,
    };
    createOrder(data);
    setOrder(initialOrderState);
  };

  return (
    <StyledDiv
      panning={panning}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={resetPan}
      onMouseLeave={resetPan}
    >
      <ScrollableSVG
        viewBoxWidth={mapData.width}
        viewBoxHeight={mapData.height}
        interacting={interacting}
        panning={panning}
      >
        <defs>
          <ArrowheadMarker id="arrow-move" fill="white" width={3} height={3} />
        </defs>
        <rect
          width={mapData.width}
          height={mapData.height}
          fill={colors.base}
        />
        <Territories
          getCallbacks={getTerritoryCallbacks}
          getTerritoryOrderState={getTerritoryOrderState}
          hovering={hovering}
          panning={panning}
          territories={territories}
        />
        <Orders orders={orders} />
      </ScrollableSVG>
      <Tooltip territory={tooltip} />
      <OrderDialogue
        onClickCancel={() => setOrder(initialOrderState)}
        onClickConfirm={postOrder}
        onClickChoice={onClickOrderTypeChoice}
        updateOrderState={updateOrderState}
        orderTypeChoices={orderTypeChoices}
        pieceTypeChoices={pieceTypeChoices}
        nation={userNation}
        order={order}
      />
    </StyledDiv>
  );
};

export default Map;

import React, { useState } from 'react';

import styled from '@emotion/styled';

import ArrowheadMarker from './ArrowheadMarker';
import OrderDialogue from './OrderDialogue';
import Orders from './Orders';
import ScrollableSVG from './ScrollableSVG';
import Territories from './Territories';
import Tooltip from './Tooltip';
import { colors } from '../variables';

import viewBox from '../data/standard/viewBox.json';

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
  const { postOrder, order, turn } = props;
  const { orders, territories, userNation } = turn;

  const PANNING_THRESHOLD = 5;

  const [panning, setPanning] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [tooltip, setTooltip] = useState(null);
  const [hovering, setHovering] = useState(null);
  const [clickPos, setClickPos] = useState(null);
  const [mousePos, setMousePos] = useState(null);

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
      if (!panning) order.clickTerritory(territory);
    };
    const contextMenu = (e) => {
      e.nativeEvent.preventDefault();
      setTooltip(territory);
    };
    return { mouseOut, mouseOver, mouseUp, contextMenu };
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

  return (
    <StyledDiv
      panning={panning}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={resetPan}
      onMouseLeave={resetPan}
    >
      <ScrollableSVG
        viewBoxWidth={viewBox.width}
        viewBoxHeight={viewBox.height}
        interacting={interacting}
        panning={panning}
      >
        <defs>
          <ArrowheadMarker id="arrow-move" fill="white" width={3} height={3} />
        </defs>
        <rect
          width={viewBox.width}
          height={viewBox.height}
          fill={colors.base}
        />
        <Territories
          getCallbacks={getTerritoryCallbacks}
          hovering={hovering}
          order={order}
          panning={panning}
          territories={territories}
        />
        <Orders orders={orders} />
      </ScrollableSVG>
      <Tooltip territory={tooltip} />
      <OrderDialogue
        onClickConfirm={postOrder}
        nation={userNation}
        order={order}
      />
    </StyledDiv>
  );
};

export default Map;

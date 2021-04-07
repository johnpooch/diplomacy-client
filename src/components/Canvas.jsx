import { connect, ReactReduxContext, Provider } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import React, { useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from 'styled-components';

import { clamp, useReferredState } from '../utils';
import Orders from './Orders';
import ContextMenu from './CanvasContextMenu';
import Pieces from './CanvasPieces';
import Portal from './Portal';
import Territories from './CanvasTerritories';
import Tooltip from './CanvasTooltip';
import viewBox from '../data/standard/viewBox.json';

import { turnSelectors } from '../store/turns';

const ZOOM_FACTOR = 1.1;
const ZOOM_MAX = 3;

const getMinScale = () => {
  return Math.max(
    window.innerWidth / viewBox.width,
    window.innerHeight / viewBox.height
  );
};

const Canvas = ({ browser, turn, gameInterface }) => {
  const [hoverTarget, setHoverTarget] = useReferredState(null);
  const [isDragging, setIsDragging] = useReferredState(false);
  const [mousePosition, setMousePosition] = useReferredState({ x: 0, y: 0 });
  const [scale, setScale] = useReferredState(0);
  const [size, setSize] = useReferredState({ width: 0, height: 0 });
  const [stagePosition, setStagePosition] = useReferredState({ x: 0, y: 0 });

  const stageRef = useRef();
  const theme = useTheme();

  const bounds = ({ x, y }) => {
    return {
      x: clamp(x, size.current.width - viewBox.width * scale.current, 0),
      y: clamp(y, size.current.height - viewBox.height * scale.current, 0),
    };
  };

  const getCursor = () => {
    if (isDragging.current) return 'grabbing';
    if (hoverTarget.current && hoverTarget.current.attrs.isOrderable)
      return 'context-menu';
    return 'grab';
  };

  useEffect(() => {
    const resize = () => {
      const newScale = getMinScale();

      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const newPosition = {
        x: (viewBox.width * newScale - newSize.width) / -2,
        y: (viewBox.height * newScale - newSize.height) / -2,
      };

      setHoverTarget(null);
      setScale(newScale);
      setSize(newSize);
      setStagePosition(newPosition);
    };

    const zoom = (e) => {
      if (isDragging.current) return;

      const newScale = clamp(
        e.deltaY > 0
          ? scale.current / ZOOM_FACTOR
          : scale.current * ZOOM_FACTOR,
        getMinScale(),
        ZOOM_MAX
      );

      const pointer = stageRef.current.getPointerPosition();
      if (!pointer) return;

      const mousePointTo = {
        x: (pointer.x - stagePosition.current.x) / scale.current,
        y: (pointer.y - stagePosition.current.y) / scale.current,
      };

      const newPosition = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      setHoverTarget(null);
      setScale(newScale);
      setStagePosition(bounds(newPosition));
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('wheel', zoom.bind(scale));

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('wheel', zoom);
    };
  }, []);

  const handleClick = (e) => {
    if (!e.target) return gameInterface.reset();

    const { territory } = e.target.attrs;
    if (territory) {
      return gameInterface.onClickTerritory(territory);
    }
    return gameInterface.reset();
  };

  const isMobile = browser.lessThan.small;

  return (
    <ReactReduxContext.Consumer>
      {/* See https://github.com/konvajs/react-konva/issues/311#issuecomment-536634446 */}
      {({ store }) => (
        <Stage
          ref={stageRef}
          width={size.current.width}
          height={size.current.height}
          x={stagePosition.current.x}
          y={stagePosition.current.y}
          scaleX={scale.current}
          scaleY={scale.current}
          draggable
          onDragStart={() => {
            setIsDragging(true);
            setHoverTarget(null);
          }}
          onDragEnd={(e) => {
            setIsDragging(false);
            setStagePosition({
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onClick={(event) => handleClick(event)}
          onTouchEnd={(event) => handleClick(event)}
          dragBoundFunc={(pos) => bounds(pos)}
          style={{ cursor: getCursor(), background: 'black' }}
        >
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Layer
                x={viewBox.territoriesX}
                y={viewBox.territoriesY}
                onMouseMove={(event) => {
                  if (!isDragging.current) setHoverTarget(event.target);
                  else setHoverTarget(null);
                  setMousePosition({
                    x: event.evt.clientX,
                    y: event.evt.clientY,
                  });
                }}
                onMouseOut={() => {
                  setHoverTarget(null);
                }}
                onBlur={() => {
                  setHoverTarget(null);
                }}
              >
                <Territories
                  hoverId={
                    hoverTarget.current ? hoverTarget.current.attrs.id : null
                  }
                  turn={turn}
                />
              </Layer>
              <Layer>
                <Orders turn={turn} />
              </Layer>
              <Layer>
                <Pieces turn={turn} />
              </Layer>
              <Layer>
                <Tooltip
                  hoverTarget={hoverTarget.current}
                  mousePosition={mousePosition.current}
                  scale={scale.current}
                  stagePosition={stagePosition.current}
                  stageRef={stageRef}
                />
              </Layer>
              <Layer>
                {gameInterface.showContextMenu() && !isMobile && (
                  <Portal theme={theme}>
                    <ContextMenu
                      stageRef={stageRef}
                      selectedTarget={gameInterface.source}
                      mousePosition={mousePosition.current}
                      onOptionSelected={gameInterface.onOptionSelected}
                      options={gameInterface.getOptions()}
                    />
                  </Portal>
                )}
              </Layer>
            </ThemeProvider>
          </Provider>
        </Stage>
      )}
    </ReactReduxContext.Consumer>
  );
};

const mapStateToProps = (state, { turn: turnId }) => {
  const { browser } = state;
  const turn = turnSelectors.selectById(state, turnId);
  return { browser, turn };
};

export default connect(mapStateToProps, null)(Canvas);

import React, { useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { connect, ReactReduxContext, Provider } from 'react-redux';
import { ThemeProvider, useTheme } from 'styled-components';

import viewBox from '../data/standard/viewBox.json';
import { turnSelectors } from '../store/turns';
import { clamp, useReferredState } from '../utils';

import ContextMenu from './CanvasContextMenu';
import Pieces from './CanvasPieces';
import Territories from './CanvasTerritories';
import Tooltip from './CanvasTooltip';
import Orders from './Orders';
import Portal from './Portal';

const ZOOM_FACTOR = 1.1;
const ZOOM_MAX = 3;

const getMinScale = () => {
  return Math.min(
    window.innerWidth / viewBox.width,
    window.innerHeight / viewBox.height
  );
};

const Canvas = ({ browser, turn, gameInterpreter }) => {
  const [hoverTarget, setHoverTarget] = useReferredState(null);
  const [isDragging, setIsDragging] = useReferredState(false);
  const [mousePosition, setMousePosition] = useReferredState({ x: 0, y: 0 });
  const [scale, setScale] = useReferredState(0);
  const [size, setSize] = useReferredState({ width: 0, height: 0 });
  const [stagePosition, setStagePosition] = useReferredState({ x: 0, y: 0 });

  const stageRef = useRef();
  const theme = useTheme();

  const zoomBounds = ({ x, y }) => {
    return {
      x: clamp(x, (size.current.width - viewBox.width * scale.current) / 2, 0),
      y: clamp(
        y,
        (size.current.height - viewBox.height * scale.current) / 2,
        0
      ),
    };
  };

  const getBound = (val, viewBoxVal, windowVal, stagePosVal, sc) => {
    // If the map is smaller than the window, return stagePosVal, i.e. cannot drag.
    if (viewBoxVal * sc <= windowVal) return stagePosVal;
    // Get the size of the entire board
    const fullSize = viewBoxVal * sc;
    // Drag must be between 0 and the size of the board minus viewport
    return clamp(val, -(fullSize - windowVal), 0);
  };

  const dragBounds = ({ x, y }) => {
    return {
      x: getBound(
        x,
        viewBox.width,
        window.innerWidth,
        stagePosition.current.x,
        scale.current
      ),
      y: getBound(
        y,
        viewBox.height,
        window.innerHeight,
        stagePosition.current.y,
        scale.current
      ),
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
      setStagePosition(zoomBounds(newPosition));
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
    if (!e.target) return gameInterpreter.reset();

    const { territory } = e.target.attrs;
    if (territory) {
      return gameInterpreter.onClickTerritory(territory);
    }
    return gameInterpreter.reset();
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
          dragBoundFunc={(pos) => dragBounds(pos)}
          style={{
            cursor: getCursor(),
            background: theme.colors.map.background,
          }}
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
                {gameInterpreter.showContextMenu() && !isMobile && (
                  <Portal theme={theme}>
                    <ContextMenu
                      stageRef={stageRef}
                      selectedTarget={gameInterpreter.source}
                      mousePosition={mousePosition.current}
                      onClickOption={gameInterpreter.onClickOption}
                      options={gameInterpreter.getContextMenuOptions()}
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

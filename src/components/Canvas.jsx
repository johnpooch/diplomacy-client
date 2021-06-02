import Konva from 'konva';
import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { connect, ReactReduxContext, Provider } from 'react-redux';

import viewBox from '../data/standard/viewBox.json';
import { turnSelectors } from '../store/turns';
import { clamp, getCenter, getDistance, useReferredState } from '../utils';

import ContextMenu from './CanvasContextMenu';
import Pieces from './CanvasPieces';
import Territories from './CanvasTerritories';
import { MuiThemeProvider, useTheme } from './MaterialUI';
import Orders from './Orders';
import Portal from './Portal';

// By default Konva disables hit detection during drag for performance reasons
// but we need to enable it to allow pinch zoom.
Konva.hitOnDragEnabled = true;

const ZOOM_FACTOR = 1.1;
const ZOOM_MAX = 3;

const Canvas = ({ browser, order, turn, gameInterpreter }) => {
  const [hoverTarget, setHoverTarget] = useReferredState(null);
  const [isDragging, setIsDragging] = useReferredState(false);
  const [mousePosition, setMousePosition] = useReferredState({ x: 0, y: 0 });
  const [scale, setScale] = useReferredState(0);
  const [size, setSize] = useReferredState({ width: 0, height: 0 });
  const [stagePosition, setStagePosition] = useReferredState({ x: 0, y: 0 });

  // Used to distinguish between touch "clicks" and touch drags
  const [isTouchMoving, setIsTouchMoving] = useReferredState(false);

  // Used to support pinch zoom
  const [lastCenter, setLastCenter] = useReferredState(null);
  const [lastDist, setLastDist] = useReferredState(0);

  const stageRef = useRef();
  const theme = useTheme();

  const getContainerWidth = () => stageRef.current.container().offsetWidth;
  const getContainerHeight = () => stageRef.current.container().offsetHeight;

  const getMinScale = () => {
    return Math.min(
      getContainerWidth() / viewBox.width,
      getContainerHeight() / viewBox.height
    );
  };

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
        getContainerWidth(),
        stagePosition.current.x,
        scale.current
      ),
      y: getBound(
        y,
        viewBox.height,
        getContainerHeight(),
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

  const getNewPosition = (center, sc) => {
    const pointTo = {
      x: (center.x - stagePosition.current.x) / scale.current,
      y: (center.y - stagePosition.current.y) / scale.current,
    };
    return {
      x: center.x - pointTo.x * sc,
      y: center.y - pointTo.y * sc,
    };
  };

  const getNewScale = (scaleAmount) =>
    clamp(scaleAmount, getMinScale(), ZOOM_MAX);

  const getTouchPoints = (touches) => {
    const touchPoints = [];
    for (let i = 0; i < touches.length; i += 1) {
      touchPoints.push({
        x: touches[i].clientX,
        y: touches[i].clientY,
      });
    }
    return touchPoints;
  };

  useEffect(() => {
    const resize = () => {
      const newScale = getMinScale();

      const newSize = {
        width: getContainerWidth(),
        height: getContainerHeight(),
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

      const newScale = getNewScale(
        e.deltaY > 0 ? scale.current / ZOOM_FACTOR : scale.current * ZOOM_FACTOR
      );

      const pointer = stageRef.current.getPointerPosition();
      if (!pointer) return;

      const newPosition = getNewPosition(pointer, newScale);

      setHoverTarget(null);
      setScale(newScale);
      setStagePosition(zoomBounds(newPosition));
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    window.addEventListener('wheel', zoom.bind(scale));

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
      window.removeEventListener('wheel', zoom);
    };
  }, []);

  const handlePinchZoom = (e) => {
    if (stageRef.current.isDragging()) {
      stageRef.current.stopDrag();
      setIsDragging(false);
    }
    const [p1, p2] = getTouchPoints(e.touches);
    const newCenter = getCenter(p1, p2);
    const dist = getDistance(p1, p2);

    if (!lastCenter.current) setLastCenter(newCenter);
    if (!lastDist.current) setLastDist(dist);

    const newScale = getNewScale(scale.current * (dist / lastDist.current));
    const newPos = getNewPosition(newCenter, newScale);

    setScale(newScale);
    setStagePosition(zoomBounds(newPos));
    setLastDist(dist);
    setLastCenter(newCenter);
  };

  const endPinchZoom = () => {
    setLastDist(0);
    setLastCenter(null);
  };

  const handleClick = (e) => {
    if (!e.target) return gameInterpreter.reset();

    const { territory } = e.target.attrs;
    if (territory) {
      return gameInterpreter.onClickTerritory(territory);
    }
    return gameInterpreter.reset();
  };

  const isMobile = browser.lessThan.medium;

  const mapWrapperStyle = {
    // -webkit-fill-available is used instead of 100% to prevent issue controls
    // on mobile block part of the canvas
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
  };

  return (
    <div style={mapWrapperStyle}>
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
            onDragStart={(e) => {
              // Do not drag if using two fingers on touch screen
              if (e.evt.touches.length > 1) return;
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
            onTouchMove={(e) => {
              setIsTouchMoving(true);
              if (e.evt.touches.length === 2) handlePinchZoom(e.evt);
            }}
            onTouchEnd={(event) => {
              endPinchZoom();
              if (!isTouchMoving.current) handleClick(event);
              setIsTouchMoving(false);
            }}
            dragBoundFunc={(pos) => dragBounds(pos)}
            style={{
              cursor: getCursor(),
              width: '100%',
              height: '100%',
            }}
          >
            <Provider store={store}>
              <MuiThemeProvider theme={theme}>
                <Layer>
                  <Rect
                    width={viewBox.width}
                    height={viewBox.height}
                    fill={theme.palette.map.background}
                  />
                </Layer>
                <Layer
                  x={viewBox.territoriesX}
                  y={viewBox.territoriesY}
                  style={{
                    background: theme.palette.map.background,
                  }}
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
                    order={order}
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
              </MuiThemeProvider>
            </Provider>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};

const mapStateToProps = (state, { turn: turnId }) => {
  const { browser } = state;
  const turn = turnSelectors.selectById(state, turnId);
  return { browser, turn };
};

export default connect(mapStateToProps, null)(Canvas);

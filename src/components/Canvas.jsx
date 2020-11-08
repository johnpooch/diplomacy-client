import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

import ContextMenu from './CanvasContextMenu';
import Pieces from './CanvasPieces';
import Portal from './Portal';
import Territories from './CanvasTerritories';
import Tooltip from './CanvasTooltip';
import viewBox from '../data/standard/viewBox.json';
import { clamp, useReferredState } from '../utils';
import { variables } from '../variables';

const ZOOMFACTOR = 1.1;
const ZOOMMAX = 3;

const getMinScale = () => {
  return Math.max(
    window.innerWidth / viewBox.width,
    window.innerHeight / viewBox.height
  );
};

const Canvas = ({ currentTurn }) => {
  const { territories, userNation } = currentTurn;

  const [hoverTarget, setHoverTarget] = useReferredState(null);
  const [isDragging, setIsDragging] = useReferredState(false);
  const [mousePosition, setMousePosition] = useReferredState({ x: 0, y: 0 });
  const [scale, setScale] = useReferredState(0);
  const [selectedTarget, setSelectedTarget] = useReferredState(null);
  const [size, setSize] = useReferredState({ width: 0, height: 0 });
  const [stagePosition, setStagePosition] = useReferredState({ x: 0, y: 0 });

  const stageRef = useRef();

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
      setSelectedTarget(null);
      setScale(newScale);
      setSize(newSize);
      setStagePosition(newPosition);
    };

    const zoom = (e) => {
      if (isDragging.current) return;

      const newScale = clamp(
        e.deltaY > 0 ? scale.current / ZOOMFACTOR : scale.current * ZOOMFACTOR,
        getMinScale(),
        ZOOMMAX
      );

      const pointer = stageRef.current.getPointerPosition();
      const mousePointTo = {
        x: (pointer.x - stagePosition.current.x) / scale.current,
        y: (pointer.y - stagePosition.current.y) / scale.current,
      };
      const newPosition = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };

      setHoverTarget(null);
      setSelectedTarget(null);
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

  return (
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
        setSelectedTarget(null);
      }}
      onDragEnd={(e) => {
        setIsDragging(false);
        setStagePosition({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onClick={(event) => {
        if (!event.target) {
          setSelectedTarget(null);
        } else if (
          selectedTarget.current &&
          selectedTarget.current.attrs.id === event.target.attrs.id
        ) {
          setSelectedTarget(null);
        } else if (event.target.attrs.isOrderable) {
          setSelectedTarget(event.target);
          return;
        }
        setSelectedTarget(null);
      }}
      dragBoundFunc={(pos) => bounds(pos)}
      style={{ cursor: getCursor() }}
    >
      <Layer>
        <Rect
          width={viewBox.width}
          height={viewBox.height}
          fill={variables.colors.base}
        />
      </Layer>
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
          territories={territories}
          hoverId={hoverTarget.current ? hoverTarget.current.attrs.id : null}
          userNation={userNation}
        />
      </Layer>
      <Layer>
        <Pieces
          territories={territories}
          hoverId={hoverTarget.current ? hoverTarget.current.attrs.id : null}
          selectedId={
            selectedTarget.current ? selectedTarget.current.attrs.id : null
          }
          userNation={userNation}
        />
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
        {selectedTarget.current ? (
          <Portal>
            <ContextMenu
              stageRef={stageRef}
              selectedTarget={selectedTarget.current}
              mousePosition={mousePosition.current}
              onOptionSelected={(option) => {
                setSelectedTarget(null);
                console.log('Handle', option);
              }}
            />
          </Portal>
        ) : null}
      </Layer>
    </Stage>
  );
};

export default Canvas;

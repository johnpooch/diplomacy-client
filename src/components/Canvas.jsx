import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

import Territories from './CanvasTerritories';
import Tooltip from './CanvasTooltip';
import viewBox from '../data/standard/viewBox.json';
import { clamp, useReferredState } from '../utils';
import { variables } from '../variables';

const Canvas = ({ currentTurn }) => {
  const { territories } = currentTurn;

  const [hoverTarget, setHoverTarget] = useReferredState(null);
  const [isDragging, setIsDragging] = useReferredState(false);
  const [pointer, setPointer] = useReferredState({ x: 0, y: 0 });
  const [position, setPosition] = useReferredState({ x: 0, y: 0 });
  const [scale, setScale] = useReferredState(0);
  const [size, setSize] = useReferredState({ width: 0, height: 0 });

  const stageRef = useRef();

  const ZOOMFACTOR = 1.1;
  const ZOOMMAX = 3;

  const bounds = (pos) => {
    return {
      x: clamp(pos.x, size.current.width - viewBox.width * scale.current, 0),
      y: clamp(pos.y, size.current.height - viewBox.height * scale.current, 0),
    };
  };

  useEffect(() => {
    const resize = () => {
      const scaleX = window.innerWidth / viewBox.width;
      const scaleY = window.innerHeight / viewBox.height;
      const newScale = Math.max(scaleX, scaleY);

      const newSize = {
        width: viewBox.width * scaleX,
        height: viewBox.height * scaleY,
      };

      const newPosition = {
        x: (viewBox.width * newScale - newSize.width) / -2,
        y: (viewBox.height * newScale - newSize.height) / -2,
      };

      setScale(newScale);
      setSize(newSize);
      setPosition(newPosition);
    };

    const zoom = (e) => {
      if (isDragging.current) return;

      const newScale = Math.min(
        e.deltaY > 0 ? scale.current / ZOOMFACTOR : scale.current * ZOOMFACTOR,
        ZOOMMAX
      );

      if (viewBox.width * newScale < size.current.width) return;
      if (viewBox.height * newScale < size.current.height) return;

      const mousePointTo = {
        x: (pointer.current.x - position.current.x) / scale.current,
        y: (pointer.current.y - position.current.y) / scale.current,
      };
      const newPosition = {
        x: pointer.current.x - mousePointTo.x * newScale,
        y: pointer.current.y - mousePointTo.y * newScale,
      };

      setScale(newScale);
      setPosition(bounds(newPosition));
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
      x={position.current.x}
      y={position.current.y}
      scaleX={scale.current}
      scaleY={scale.current}
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e) => {
        setIsDragging(false);
        setPosition({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      dragBoundFunc={(pos) => bounds(pos)}
      onMouseMove={() => {
        setPointer(stageRef.current.getPointerPosition());
      }}
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
          setHoverTarget(event.target);
        }}
        onMouseOut={() => {
          setHoverTarget();
        }}
        onBlur={() => {
          setHoverTarget();
        }}
      >
        <Territories territories={territories} />
      </Layer>
      {!isDragging.current ? (
        <Layer>
          <Tooltip
            target={hoverTarget.current}
            stageRef={stageRef}
            scale={scale.current}
            position={position.current}
            pointer={pointer.current}
          />
        </Layer>
      ) : null}
    </Stage>
  );
};

export default Canvas;

import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';

import viewBox from '../data/standard/viewBox.json';
import { clamp, useReferredState } from '../utils';

const Canvas = () => {
  const [isDragging, setIsDragging] = useReferredState(false);
  const [position, setPosition] = useReferredState({ x: 0, y: 0 });
  const [scale, setScale] = useReferredState(0);
  const [size, setSize] = useReferredState({ width: 0, height: 0 });

  const stageRef = useRef();

  const ZOOMFACTOR = 1.2;
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

      const pointer = stageRef.current.getPointerPosition();
      const mousePointTo = {
        x: (pointer.x - position.current.x) / scale.current,
        y: (pointer.y - position.current.y) / scale.current,
      };
      const newPosition = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
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
    >
      <Layer>
        <Rect
          width={viewBox.width}
          height={viewBox.height}
          stroke="green"
          strokeWidth={20}
          fill={isDragging.current ? 'yellow' : 'white'}
        />
        <Circle x={200} y={200} stroke="black" radius={50} />
      </Layer>
    </Stage>
  );
};

export default Canvas;

import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';

import viewBox from '../data/standard/viewBox.json';

const Canvas = () => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const [scale, setScale] = useState({
    x: 0,
    y: 0,
  });

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const resize = () => {
      const newScale = {
        x: window.innerWidth / viewBox.width,
        y: window.innerHeight / viewBox.height,
      };
      newScale.max = Math.max(newScale.x, newScale.y);

      const newSize = {
        width: viewBox.width * newScale.x,
        height: viewBox.height * newScale.y,
      };

      const newPosition = {
        x: (viewBox.width * newScale.max - newSize.width) / -2,
        y: (viewBox.height * newScale.max - newSize.height) / -2,
      };

      setScale(newScale);
      setSize(newSize);
      setPosition(newPosition);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <Stage
      width={size.width}
      height={size.height}
      x={position.x}
      y={position.y}
      scaleX={scale.max}
      scaleY={scale.max}
    >
      <Layer>
        <Rect
          width={viewBox.width}
          height={viewBox.height}
          stroke="green"
          strokeWidth={20}
        />
        <Rect x={500} y={250} width={50} height={50} fill="red" />
        <Circle x={200} y={200} stroke="black" radius={50} />
      </Layer>
    </Stage>
  );
};

export default Canvas;

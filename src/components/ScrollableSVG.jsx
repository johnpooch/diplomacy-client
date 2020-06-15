import React, { useState } from 'react';
import useDimensions from 'react-use-dimensions';

const ScrollableSVG = (props) => {
  const ZOOM_POWER = 0.1;
  const ZOOM_MIN = 0.25;
  const ZOOM_MAX = 2.0;

  const { viewBoxWidth, viewBoxHeight, className, children, panning } = props;

  const [ref, { width, height }] = useDimensions();
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    w: viewBoxWidth,
    h: viewBoxHeight,
  });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  // const [panning, setPanning] = useState(false);

  const getViewBox = () => {
    return `${-viewBox.x} ${-viewBox.y} ${viewBox.w} ${viewBox.h}`;
  };

  const scale = (n) => {
    if (width / height > viewBoxWidth / viewBoxHeight) {
      // scale using width
      const zoomFactor = viewBox.w / viewBoxWidth;
      return (n / width) * viewBoxWidth * zoomFactor;
    }
    // scale using height
    const zoomFactor = viewBox.h / viewBoxHeight;
    return (n / height) * viewBoxHeight * zoomFactor;
  };

  const mouseDown = (e) => {
    // setPanning(true);
    setOrigin({
      x: scale(e.nativeEvent.clientX) - viewBox.x,
      y: scale(e.nativeEvent.clientY) - viewBox.y,
    });
  };

  const mouseMove = (e) => {
    if (panning) {
      setViewBox({
        x: scale(e.nativeEvent.clientX) - origin.x,
        y: scale(e.nativeEvent.clientY) - origin.y,
        w: viewBox.w,
        h: viewBox.h,
      });
    }
  };

  // const mouseUp = () => {
  //   setPanning(false);
  // };

  const wheel = (e) => {
    const dz = Math.sign(e.deltaY) * ZOOM_POWER;
    let z = zoom + dz;
    if (z > ZOOM_MAX) {
      z = ZOOM_MAX;
    } else if (z < ZOOM_MIN) {
      z = ZOOM_MIN;
    }
    setZoom(z);

    const w = viewBoxWidth * z;
    const h = viewBoxHeight * z;
    const dw = w - viewBox.w;
    const dh = h - viewBox.h;

    setViewBox({
      x: viewBox.x + dw / 2,
      y: viewBox.y + dh / 2,
      w,
      h,
    });
  };

  return (
    <svg
      ref={ref}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      viewBox={getViewBox(viewBox)}
      onMouseDown={(e) => {
        mouseDown(e);
      }}
      onMouseMove={(e) => {
        mouseMove(e);
      }}
      // onMouseUp={(e) => {
      //   mouseUp(e);
      // }}
      // onMouseLeave={(e) => {
      //   mouseUp(e);
      // }}
      onWheel={(e) => {
        wheel(e);
      }}
    >
      {children}
    </svg>
  );
};

export default ScrollableSVG;

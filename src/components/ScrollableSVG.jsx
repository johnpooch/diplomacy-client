import React, { useState } from 'react';
import useDimensions from 'react-use-dimensions';

const ScrollableSVG = (props) => {
  const ZOOM_POWER = 0.1;

  const getViewBox = (viewBox) => {
    return `${-viewBox.x} ${-viewBox.y} ${viewBox.w} ${viewBox.h}`;
  };

  const scale = (n, width, height) => {
    if (width / height > props.viewBoxWidth / props.viewBoxHeight) {
      // scale using height
      return (n / height) * props.viewBoxHeight;
    }
    // scale using width
    return (n / width) * props.viewBoxWidth;
  };

  const getZoom = (viewBox) => {
    return viewBox.h / props.viewBoxHeight;
  };

  const scaleZoom = (n, width, height, viewBox) => {
    const zoom = getZoom(viewBox);
    return scale(n, width, height) * zoom;
  };

  const mouseDown = (e, width, height, viewBox, setOrigin, setPanning) => {
    setOrigin({
      x: scaleZoom(e.nativeEvent.clientX, width, height, viewBox) - viewBox.x,
      y: scaleZoom(e.nativeEvent.clientY, width, height, viewBox) - viewBox.y,
    });
    setPanning(true);
  };

  const mouseMove = (
    e,
    width,
    height,
    panning,
    origin,
    viewBox,
    setViewBox
  ) => {
    if (panning) {
      setViewBox({
        x: scaleZoom(e.nativeEvent.clientX, width, height, viewBox) - origin.x,
        y: scaleZoom(e.nativeEvent.clientY, width, height, viewBox) - origin.y,
        w: viewBox.w,
        h: viewBox.h,
      });
    }
  };

  const mouseUp = (e, setPanning) => {
    setPanning(false);
  };

  const wheel = (e, zoomPower, width, height, viewBox, setViewBox) => {
    const dw = viewBox.w * Math.sign(e.deltaY) * zoomPower;
    const dh = viewBox.h * Math.sign(e.deltaY) * zoomPower;
    setViewBox({
      x: viewBox.x + dw / 2,
      y: viewBox.y + dh / 2,
      w: viewBox.w + dw,
      h: viewBox.h + dh,
    });
  };

  const { viewBoxWidth, viewBoxHeight, className, children } = props;

  const [ref, { width, height }] = useDimensions();
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    w: viewBoxWidth,
    h: viewBoxHeight,
  });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);

  return (
    <svg
      ref={ref}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      viewBox={getViewBox(viewBox)}
      onMouseDown={(e) => {
        mouseDown(e, width, height, viewBox, setOrigin, setPanning);
      }}
      onMouseMove={(e) => {
        mouseMove(e, width, height, panning, origin, viewBox, setViewBox);
      }}
      onMouseLeave={(e) => {
        mouseUp(e, setPanning);
      }}
      onMouseUp={(e) => {
        mouseUp(e, setPanning);
      }}
      onWheel={(e) => {
        wheel(e, ZOOM_POWER, width, height, viewBox, setViewBox);
      }}
    >
      {children}
    </svg>
  );
};

export default ScrollableSVG;

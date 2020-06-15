import React from 'react';

const ArrowheadMarker = (props) => {
  const { fill, height, id, width } = props;
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="5"
      refY="5"
      markerWidth={width}
      markerHeight={height}
      orient="auto-start-reverse"
      fill={fill}
    >
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
  );
};

export default ArrowheadMarker;

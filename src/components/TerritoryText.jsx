import React from 'react';

const TerritoryText = (props) => {
  const { abbreviation, x, y } = props;
  if (!abbreviation) return null;
  return (
    <text className="text" x={x} y={y} transform="translate(195, 170)">
      {abbreviation}
    </text>
  );
};

export default TerritoryText;

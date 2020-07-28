import React from 'react';

const TerritoryText = (props) => {
  const { abbreviation, text } = props;
  if (abbreviation && text) {
    const { x, y } = text;
    return (
      <text className="text" x={x} y={y} transform="translate(195, 170)">
        {abbreviation}
      </text>
    );
  }
  return null;
};

export default TerritoryText;

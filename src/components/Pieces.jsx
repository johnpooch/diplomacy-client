import React from 'react';

import Piece from './Piece';

const Pieces = (props) => {
  const { pieces } = props;
  const elements = [];
  pieces.forEach((piece) => {
    const { id } = piece;
    elements.push(<Piece key={id} piece={piece} />);
  });
  return <g>{elements}</g>;
};

export default Pieces;

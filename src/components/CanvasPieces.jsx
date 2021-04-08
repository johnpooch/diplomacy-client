import React from 'react';
import { Group } from 'react-konva';

import Piece from './CanvasPiece';

const Pieces = ({ turn }) => {
  return (
    <Group>
      {turn.pieceStates.map((ps) => {
        return <Piece key={ps} id={ps} turnId={turn.id} />;
      })}
    </Group>
  );
};

export default Pieces;

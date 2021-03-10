import React from 'react';
import { Arrow, Line, Group, RegularPolygon } from 'react-konva';

import { OrderTypes } from '../game/base';
import { Vector } from '../utils';

const OFFSET = 25;
const HOLDRADIUS = 22;
const HOLDSTROKEWIDTH = 5;
const PATHSTROKEWIDTH = 8;
const SUPPORTDASH = [1, 1, 0.001];

const Hold = ({ order, theme }) => {
  const { colors } = theme;

  const x = order.source.pieceX;
  const y = order.source.pieceY;

  return (
    <RegularPolygon
      radius={HOLDRADIUS}
      stroke={colors.text}
      strokeWidth={HOLDSTROKEWIDTH}
      sides={8}
      rotation={22.5}
      x={x}
      y={y}
    />
  );
};

const Move = ({ order, theme }) => {
  const x1 = order.source.pieceX;
  const y1 = order.source.pieceY;
  const x2 = order.target.pieceX;
  const y2 = order.target.pieceY;
  const v = new Vector(x2 - x1, y2 - y1);
  v.normalize();
  const points = [x1, y1, x2 - OFFSET * v.x, y2 - OFFSET * v.y];
  return (
    <Arrow
      points={points}
      fill={theme.colors.text}
      stroke={theme.colors.text}
      strokeWidth={PATHSTROKEWIDTH}
      pointerLength={5}
      pointerWidth={5}
    />
  );
};

const AssumedMove = ({ order, theme }) => {
  // When a move-support or convoy order does not have an associated move, we
  // add an arrow to represent the order which the player is attempting to
  // support/convoy anyways.
  const x1 = order.aux.pieceX;
  const y1 = order.aux.pieceY;
  const x2 = order.target.pieceX;
  const y2 = order.target.pieceY;
  const v = new Vector(x2 - x1, y2 - y1);
  v.normalize();
  const points = [x1, y1, x2 - OFFSET * v.x, y2 - OFFSET * v.y];
  return (
    <Arrow
      points={points}
      stroke={theme.colors.neutral}
      strokeWidth={PATHSTROKEWIDTH}
      pointerLength={5}
      pointerWidth={5}
    />
  );
};

const HoldSupport = ({ order }) => {
  const x1 = order.source.pieceX;
  const y1 = order.source.pieceY;
  const x2 = order.target.pieceX;
  const y2 = order.target.pieceY;
  const v = new Vector(x2 - x1, y2 - y1);
  v.normalize();
  const points = [x1, y1, x2 - OFFSET * v.x, y2 - OFFSET * v.y];
  return (
    <Line
      points={points}
      fill={FILL}
      stroke={FILL}
      strokeWidth={PATHSTROKEWIDTH}
      dash={SUPPORTDASH}
    />
  );
};

const MoveSupport = ({ order }) => {
  const x1 = order.source.pieceX;
  const y1 = order.source.pieceY;
  const cx1 = order.aux.pieceX;
  const cy1 = order.aux.pieceY;
  const cx2 = (order.aux.pieceX + order.target.pieceX) / 2;
  const cy2 = (order.aux.pieceY + order.target.pieceY) / 2;
  const x2 = order.target.pieceX;
  const y2 = order.target.pieceY;
  const v = new Vector(x2 - cx1, y2 - cy1);
  v.normalize();
  const points = [
    x1,
    y1,
    cx1,
    cy1,
    cx2,
    cy2,
    x2 - OFFSET * v.x,
    y2 - OFFSET * v.y,
  ];

  return (
    <Line
      bezier
      points={points}
      fill={FILL}
      stroke={FILL}
      strokeWidth={PATHSTROKEWIDTH}
      dash={SUPPORTDASH}
    />
  );
};

const Convoy = ({ order }) => {
  const middleOfMoveX = (order.aux.pieceX + order.target.pieceX) / 2;
  const middleOfMoveY = (order.aux.pieceY + order.target.pieceY) / 2;
  const points = [
    order.source.pieceX,
    order.source.pieceY,
    middleOfMoveX,
    middleOfMoveY,
  ];
  return (
    <Line
      points={points}
      fill={FILL}
      stroke={FILL}
      strokeWidth={PATHSTROKEWIDTH}
      dash={SUPPORTDASH}
    />
  );
};

const Orders = ({ orders }) => {
  const moves = orders
    .filter((o) => o.type === OrderTypes.MOVE)
    .map((o) => <Move key={o.id} order={o} />);

  const moveSupports = orders
    .filter((o) => o.type === OrderTypes.SUPPORT && o.aux.id !== o.target.id)
    .map((o) => <MoveSupport key={o.id} order={o} />);

  const holdSupports = orders
    .filter((o) => o.type === OrderTypes.SUPPORT && o.aux.id === o.target.id)
    .map((o) => <HoldSupport key={o.id} order={o} />);

  const convoys = orders
    .filter((o) => o.type === OrderTypes.CONVOY)
    .map((o) => <Convoy key={o.id} order={o} />);

  const holds = orders
    .filter((o) => o.type === OrderTypes.HOLD)
    .map((o) => <Hold key={o.id} order={o} />);

  const assumedMoves = orders
    .filter(
      (o) =>
        [OrderTypes.SUPPORT, OrderTypes.CONVOY].includes(o.type) &&
        !orders.find((m) => m.type === OrderTypes.MOVE && m.target === o.target)
    )
    .map((o) => <AssumedMove key={o.id} order={o} />);

  return (
    <Group>
      {moveSupports}
      {moves}
      {convoys}
      {holdSupports}
      {holds}
      {assumedMoves}
    </Group>
  );
};

export default Orders;

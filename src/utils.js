import React from 'react';

export function getObjectByKey(pk, objs, key = 'pk') {
  const id = parseInt(pk, 10);
  return objs.find((obj) => {
    return obj[key] === id;
  });
}

export const dateDisplayFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = this.getLength();
  }

  getLength() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize() {
    const { length } = this;
    this.x /= length;
    this.y /= length;
  }
}

// Order utils

const getOrderAttrToUpdate = (order) => {
  /* Given the state of the order, determine which attribute should be updated
   * with the next click. */
  const { source, type, target, aux } = order;
  let attr = 'source';
  if (source && !type) return 'type';
  switch (type) {
    case 'retreat':
    case 'move':
      if (!target) attr = 'target';
      break;
    case 'support':
    case 'convoy':
      if (!aux) return 'aux';
      if (!target) return 'target';
      break;
    default:
      attr = 'source';
  }
  return attr;
};

const userCanOrder = (turn, territory) => {
  /* Determine whether a user can create an order for the given territory */
  const { current_turn: currentTurn, userNation } = turn;
  if (!(userNation && currentTurn)) return false;

  // Orders turn
  if (turn.phase === 'Order') {
    return territory.piece && territory.piece.nation === userNation.id;
  }

  // Retreat turn
  if (turn.phase === 'Retreat and Disband') {
    return (
      territory.dislodgedPiece &&
      territory.dislodgedPiece.nation === userNation.id
    );
  }

  // Build turn
  // TODO handle disband and build
  return false;
};

export const orderUtils = {
  getOrderAttrToUpdate,
  userCanOrder,
};

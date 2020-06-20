import React from 'react';

export function getOptions(choices) {
  return choices.map((c) => {
    return (
      <option key={c[0]} value={c[0]}>
        {c[1]}
      </option>
    );
  });
}

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

// TODO game related utils should be put in a separate module
export function getCurrentTurn(game) {
  const { turns } = game;
  const currentTurnIndex = turns.findIndex((obj) => obj.current_turn === true);
  return turns[currentTurnIndex];
}

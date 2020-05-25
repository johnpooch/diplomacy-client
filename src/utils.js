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

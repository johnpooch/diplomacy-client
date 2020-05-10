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

export const matchIdToAbbreviation = (id, mapData, mapRef) => {
  const ref = getObjectByKey(id, mapRef.territories);
  const { abbreviation } = ref;

  if (abbreviation) {
    const arr = Object.values(mapData.territories);
    const data = arr.find((obj) => {
      return obj.abbreviation === abbreviation;
    });

    if (data !== undefined) {
      return data;
    }
  }

  console.warn(`Missing ${ref.name}`);
  return null;
};

/* eslint-disable camelcase */

import { useEffect, useRef, useState } from 'react';
import _slugify from 'slugify';

export const useReferredState = (initialValue) => {
  const [state, setState] = useState(initialValue);
  const reference = useRef(state);

  const setReferredState = (value) => {
    reference.current = value;
    setState(value);
  };

  return [reference, setReferredState];
};

export const slugify = (str) => {
  return _slugify(str, {
    replacement: '',
    lower: true,
    strict: true,
  });
};

export const clamp = (n, min, max) => {
  return Math.max(min, Math.min(n, max));
};

export const withUnits = (vals, unit) => vals.map((val) => `${val}${unit}`);

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

export const getErrors = (errors, ...types) => {
  // Get errors form store based on action types
  const mergedErrors = {};
  types.forEach((t) => {
    const error = errors[t.typePrefix];
    if (!error) return null;
    const { non_field_errors, ...otherErrors } = error;
    if (non_field_errors) {
      if (mergedErrors.non_field_errors) {
        mergedErrors.non_field_errors = [
          ...mergedErrors.non_field_errors,
          ...non_field_errors,
        ];
      } else {
        mergedErrors.non_field_errors = non_field_errors;
      }
      Object.assign(mergedErrors, otherErrors);
    }
    return null;
  });
  return mergedErrors;
};

export const getTerritoryPieceCoords = (
  territory,
  retreating = false,
  namedCoast = null
) => {
  if (retreating) return [territory.dislodgedPieceX, territory.dislodgedPieceY];
  if (namedCoast) return [namedCoast.pieceX, namedCoast.pieceY];
  return [territory.pieceX, territory.pieceY];
};

export const onClickOutside = (ref, func) => {
  /* Calls the given function when the user clicks outside of the given component (ref) */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) func();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);
};

export const toTitleCase = (str) =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );

export const indexOn = (arr, key) => {
  return arr.reduce((map, obj) => {
    // eslint-disable-next-line no-param-reassign
    map[obj[key]] = { ...obj };
    return map;
  }, {});
};

export const groupBy = (arr, key) => {
  return arr.reduce((r, a) => {
    // eslint-disable-next-line no-param-reassign
    r[a[key]] = r[a[key]] || [];
    r[a[key]].push(a);
    return r;
  }, Object.create(null));
};

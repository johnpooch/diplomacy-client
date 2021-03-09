/* eslint-disable camelcase */

import _slugify from 'slugify';
import { useRef, useState } from 'react';

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

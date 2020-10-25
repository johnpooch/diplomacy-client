import React from 'react';

const NonFieldErrors = ({ errors }) => {
  if (!errors) return null;
  const errorDivs = errors.map((e) => {
    return <div key={e}>{e}</div>;
  });
  return <div className="non-field-errors">{errorDivs}</div>;
};

export default NonFieldErrors;

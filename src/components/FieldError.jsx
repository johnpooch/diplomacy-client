import React from 'react';

const FieldError = ({ error }) => {
  if (!error) return null;
  const errorDivs = error.map((e) => {
    return <div key={e}>{e}</div>;
  });
  return <div className="field-error">{errorDivs}</div>;
};

export default FieldError;

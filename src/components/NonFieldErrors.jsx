import React from 'react';

const NonFieldErrors = ({ errors }) => {
  if (!errors) return null;
  const errorDivs = errors.map((e) => {
    return <div key={e}>{e}</div>;
  });
  return (
    <div className="non-field-errors" role="alert">
      {errorDivs}
    </div>
  );
};

export default NonFieldErrors;

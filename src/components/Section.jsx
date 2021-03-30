import React from 'react';

const Section = ({ children, className, label }) => {
  return (
    <section className={className}>
      {label ? (
        <p className="heading">
          <span className="text">{label}</span>
        </p>
      ) : null}
      {children}
    </section>
  );
};
export default Section;

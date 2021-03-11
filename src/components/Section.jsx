import React from 'react';

const Section = ({ children, className, label }) => {
  return (
    <section className={className}>
      <p className="heading">
        <span className="text">{label}</span>
      </p>
      {children}
    </section>
  );
};
export default Section;

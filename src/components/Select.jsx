import React from 'react';

import { LabelText } from './Form';

const EMPTY_OPTION_STRING = '-------';

const Select = React.forwardRef((props, ref) => {
  const { name, label, value, onChange, options, required } = props;

  if (!options) return null;

  return (
    <label htmlFor={name}>
      <LabelText>{label}</LabelText>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        ref={ref}
      >
        {required ? null : (
          <option key="empty" value="">
            {EMPTY_OPTION_STRING}
          </option>
        )}
        {options.map((o) => (
          <option key={name + o[0]} value={o[0]}>
            {o[1]}
          </option>
        ))}
      </select>
    </label>
  );
});

export default Select;

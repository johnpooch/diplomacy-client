import React from 'react';

import { FormLabel } from './Form';

const DipSelect = (props) => {
  const { name, label, value, onChange, options, required } = props;

  const emptyOptionString = '-------';

  const formattedOptions = options.map((o) => {
    return (
      <option key={name + o[0]} value={o[0]}>
        {o[1]}
      </option>
    );
  });
  if (!required) {
    formattedOptions.unshift(
      <option key="empty" value="">
        {emptyOptionString}
      </option>
    );
  }

  return (
    <label htmlFor={name}>
      <FormLabel>{label}</FormLabel>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
      >
        {formattedOptions}
      </select>
    </label>
  );
};

export default DipSelect;

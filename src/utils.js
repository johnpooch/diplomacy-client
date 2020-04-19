import React from 'react';

function getObjectByKey(pk, objs, key = 'pk') {
  const id = parseInt(pk, 10);
  return objs.find((obj) => {
    return obj[key] === id;
  });
}

function jsonToFormFields(json) {
  const fields = [];
  Object.keys(json).forEach((key) => {
    const val = json[key];
    fields.push();
    if (val.widget_type === 'TextInput') {
      fields.push(
        <div key={key} className="form-section">
          <label htmlFor={key}>{val.label}</label>
          <input
            id={key}
            type="text"
            name={key}
            placeholder={val.label}
            required={val.required}
          />
        </div>
      );
    }
    if (val.widget_type === 'Select') {
      const options = [];
      const { choices } = val;
      for (let i = 0; i < choices.length; i += 1) {
        // TODO get initial value working.
        options.push(
          <option key={choices[i][0]} val={choices[i][0]}>
            {choices[i][1]}
          </option>
        );
      }
      fields.push(
        <div key={key} className="form-section">
          <label htmlFor={key}>{val.label}</label>
          <select id={key} key={key} name={key} label={val.label}>
            {options}
          </select>
        </div>
      );
    }
    if (val.widget_type === 'CheckboxInput') {
      fields.push(
        <div key={key} className="form-section">
          <label htmlFor={key}>{val.label}</label>
          <input
            id={key}
            key={key}
            type="checkbox"
            name={key}
            defaultChecked={val.initial_value}
          />
        </div>
      );
    }
  });
  return fields;
}

export { getObjectByKey, jsonToFormFields };

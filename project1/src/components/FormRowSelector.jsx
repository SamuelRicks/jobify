import React from "react";

const FormRowSelector = ({ name, labelText, list, defaultValue, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor="jobStatus" className="form-label">
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((itemsValue) => {
          return (
            <option key={itemsValue} value={itemsValue}>
              {itemsValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelector;

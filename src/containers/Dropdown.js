import React from "react";

const Dropdown = ({ label, options, onClick }) => {
  return (
    <select name={label} id={label} onChange={onClick}>
      {options.map(({ id, value }) => {
        return (
          <option key={id} value={value} onClick={onClick}>
            {value}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;

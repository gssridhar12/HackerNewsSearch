import React from "react";

const Textbox = ({ value, placeholder, onChange }) => {
  return <input type="text" value={value} placeholder={placeholder} onChange={onChange} />;
};

export default Textbox;

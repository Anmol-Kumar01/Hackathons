import React from "react";

function InputField({ label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">{label}</label>
      <input
        type="number"
        name={label}
        value={value}
        onChange={onChange}
        step="any"
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default InputField;

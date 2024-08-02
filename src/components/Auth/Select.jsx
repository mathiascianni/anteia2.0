import React from 'react';

const Select = ({ title = "", options = [], value, onChange }) => {
  return (
    <div>
      <label htmlFor={title}>{title}</label>
      <select
        id={title}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled hidden>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.titulo}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
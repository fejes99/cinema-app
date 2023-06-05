import React from 'react';

import './Dropdown.scss';

interface Props {
  title: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({ title, value, options, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <select name={title} value={value} onChange={handleChange}>
      <option value='' disabled hidden>
        {title}...
      </option>
      {options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

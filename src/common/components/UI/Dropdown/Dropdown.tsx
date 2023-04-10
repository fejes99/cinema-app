import React from 'react';
import './Dropdown.scss';

interface Props {
  title: string;
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({ title, options, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChange(value);
  };

  return (
    <select name={title} onChange={handleChange}>
      <option value=''>{title}</option>
      {options.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

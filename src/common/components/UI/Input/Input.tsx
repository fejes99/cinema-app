import React from 'react';
import './Input.scss';

interface Props {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number | string;
  max?: number;
}

const Input: React.FC<Props> = ({ label, type, value, name, onChange, min, max }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    if (type === 'datetime-local') {
      const now = new Date();
      const selectedDateTime = new Date(value);
      if (selectedDateTime < now) return;
    }
    onChange(event);
  };

  return (
    <div className='input'>
      <div className='input__label'>{label}:</div>
      <input
        type={type}
        value={value}
        name={name}
        className='input__field'
        onChange={handleChange}
        min={min}
        max={max}
      />
    </div>
  );
};

export default Input;

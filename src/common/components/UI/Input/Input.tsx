import React from 'react';
import './Input.scss';

interface Props {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const Input: React.FC<Props> = ({ label, type, value, name, onChange, min, max }) => (
  <div className='input'>
    <div className='input__label'>{label}:</div>
    <input
      type={type}
      value={value}
      name={name}
      className='input__field'
      onChange={onChange}
      min={min}
      max={max}
    />
  </div>
);

export default Input;

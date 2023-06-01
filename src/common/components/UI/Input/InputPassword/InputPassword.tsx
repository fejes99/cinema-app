import React, { useState } from 'react';
import './InputPassword.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
  confirmPassword: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; // Add an optional error prop
}

const InputPassword: React.FC<Props> = ({ confirmPassword, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={`input-password ${error ? 'error' : ''}`}>
      <div className='input-password__label'>
        {!confirmPassword ? `Password` : `Confirm password`}:
      </div>
      <div className='input-password__field-wrapper'>
        <input
          className={`input-password__field ${error ? 'error' : ''}`}
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={value}
          onChange={onChange}
        />
        <div className='input-password__field-toggle' onClick={toggleShowPassword}>
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </div>
      </div>
      {error && <div className='input-password__error'>{error}</div>}
    </div>
  );
};

export default InputPassword;

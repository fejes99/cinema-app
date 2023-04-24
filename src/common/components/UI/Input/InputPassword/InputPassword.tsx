import React, { useState } from 'react';
import './InputPassword.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword: React.FC<Props> = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className='input-password'>
      <div className='input-password__label'>Password:</div>
      <div className='input-password__field-wrapper'>
        <input
          className='input-password__field'
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={value}
          onChange={onChange}
        />
        <div className='input-password__field-toggle' onClick={toggleShowPassword}>
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </div>
      </div>
    </div>
  );
};

export default InputPassword;

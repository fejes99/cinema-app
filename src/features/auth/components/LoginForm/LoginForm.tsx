import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './LoginForm.scss';

import { LoginDto } from 'features/auth/types/LoginDto';
import Button from 'common/components/UI/Button/Button';
import Input from 'common/components/UI/Input/Input';
import InputPassword from 'common/components/UI/Input/InputPassword/InputPassword';
import { isValidEmail } from 'features/auth/helpers/isValidEmail';

interface Props {
  onSubmit: (loginData: LoginDto) => void;
}

type ErrorType = {
  email: string;
  password: string;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [login, setLogin] = useState<LoginDto>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorType>({
    email: '',
    password: '',
  });

  const isFormValid: boolean = login.email.trim() !== '' && login.password.trim() !== '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLogin((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (): void => {
    const validationErrors = validateForm();
    if (Object.values(validationErrors).some((value) => value !== '')) {
      setErrors(validationErrors);
      return;
    }

    setErrors({ email: '', password: '' });
    onSubmit(login);
  };

  const validateForm = (): ErrorType => {
    const validationErrors: ErrorType = {
      email: '',
      password: '',
    };

    if (!login.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!isValidEmail(login.email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!login.password.trim()) {
      validationErrors.password = 'Password is required';
    }

    return validationErrors;
  };

  return (
    <div className='login'>
      <div className='login__form'>
        <div className={`login__field ${errors.email ? 'error' : ''}`}>
          <Input
            label='Email'
            type='text'
            name='email'
            value={login.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div className={`login__field ${errors.password ? 'error' : ''}`}>
          <InputPassword
            confirmPassword={false}
            value={login.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <Button size='medium' type='success' disabled={!isFormValid} onClick={handleSubmit}>
          Login
        </Button>
      </div>

      <div className='login__register'>
        Don't have an account?
        <Link to='/register' className='login__register-link'>
          Register Now!
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import Input from 'common/components/UI/Input/Input';
import { LoginDto } from 'features/auth/types/LoginDto';
import './LoginForm.scss';
import Button from 'common/components/UI/Button/Button';
import InputPassword from 'common/components/UI/Input/InputPassword/InputPassword';
import { Link } from 'react-router-dom';

interface Props {
  onSubmit: (loginData: LoginDto) => void;
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [login, setLogin] = useState<LoginDto>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const isFormValid = login.email.trim() !== '' && login.password.trim() !== '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLogin((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (): void => {
    const validationErrors = validateForm();
    if (Object.values(validationErrors).some((value) => value !== '')) {
      setErrors(validationErrors);
    } else {
      setErrors({
        email: '',
        password: '',
      });
      onSubmit(login);
    }
  };

  const validateForm = (): { email: string; password: string } => {
    const validationErrors: { email: string; password: string } = {
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

  const isValidEmail = (email: string): boolean => {
    // Email validation regex
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  return (
    <div className='login'>
      <div className='login__title'>Login</div>
      <div className='login__form'>
        <div className={`login__field ${errors.email ? 'error' : ''}`}>
          <Input
            label='Email'
            type='text'
            name='email'
            value={login.email}
            onChange={handleChange}
          />
          {errors.email && <div className='error-message'>{errors.email}</div>}
        </div>
        <div className={`login__field ${errors.password ? 'error' : ''}`}>
          <InputPassword confirmPassword={false} value={login.password} onChange={handleChange} />
          {errors.password && <div className='error-message'>{errors.password}</div>}
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

import React, { useState } from 'react';
import Input from 'common/components/UI/Input/Input';
import { RegisterDto } from 'features/auth/types/RegisterDto';
import './RegisterForm.scss';
import Button from 'common/components/UI/Button/Button';
import { Link } from 'react-router-dom';

interface Props {
  onSubmit: (registerData: RegisterDto) => void;
}

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const [register, setRegister] = useState<RegisterDto>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const isFormValid =
    register.firstName.trim() !== '' &&
    register.lastName.trim() !== '' &&
    register.email.trim() !== '' &&
    register.username.trim() !== '' &&
    register.password.trim() !== '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setRegister((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = (): void => {
    const validationErrors = validateForm();
    if (Object.values(validationErrors).some((value) => value !== '')) {
      setErrors(validationErrors);
    } else {
      setErrors({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
      onSubmit(register);
    }
  };

  const validateForm = (): RegisterDto & { confirmPassword: string } => {
    const validationErrors: RegisterDto & { confirmPassword: string } = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    if (!register.firstName.trim()) {
      validationErrors.firstName = 'First name is required';
    }

    if (!register.lastName.trim()) {
      validationErrors.lastName = 'Last name is required';
    }

    if (!register.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!isValidEmail(register.email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!register.username.trim()) {
      validationErrors.username = 'Username is required';
    }

    if (!register.password.trim()) {
      validationErrors.password = 'Password is required';
    }

    if (register.password.trim() !== confirmPassword.trim()) {
      validationErrors.confirmPassword = 'Passwords must match';
    }

    return validationErrors;
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  return (
    <div className='register'>
      <div className='register__title'>Register</div>
      <div className='register__form'>
        <div className='register__name-wrapper'>
          <div className={`register__field ${errors.firstName ? 'error' : ''}`}>
            <Input
              label='First Name'
              type='text'
              name='firstName'
              value={register.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
          </div>
          <div className={`register__field ${errors.lastName ? 'error' : ''}`}>
            <Input
              label='Last Name'
              type='text'
              name='lastName'
              value={register.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>
        </div>
        <div className={`register__field ${errors.email ? 'error' : ''}`}>
          <Input
            label='Email'
            type='text'
            name='email'
            value={register.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div className={`register__field ${errors.username ? 'error' : ''}`}>
          <Input
            label='Username'
            type='text'
            name='username'
            value={register.username}
            onChange={handleChange}
            error={errors.username}
          />
        </div>
        <div className={`register__field ${errors.password ? 'error' : ''}`}>
          <Input
            label='Password'
            type='password'
            name='password'
            value={register.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <div className={`register__field ${errors.confirmPassword ? 'error' : ''}`}>
          <Input
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />
        </div>
        <Button size='medium' type='success' disabled={!isFormValid} onClick={handleSubmit}>
          Register
        </Button>
        {errors.confirmPassword && (
          <div className='register__error-message'>{errors.confirmPassword}</div>
        )}
      </div>

      <div className='register__login'>
        Already have account?
        <Link to='/login' className='register__login-link'>
          Login Now!
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;

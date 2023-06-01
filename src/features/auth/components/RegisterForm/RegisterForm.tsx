import React, { useState } from 'react';
import Input from 'common/components/UI/Input/Input';
import { RegisterDto } from 'features/auth/types/RegisterDto';
import './RegisterForm.scss';
import Button from 'common/components/UI/Button/Button';
import InputPassword from 'common/components/UI/Input/InputPassword/InputPassword';
import { Link } from 'react-router-dom';
import { useAuthRedirect } from 'features/auth/hooks/authRedirects';

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
    register.password.trim() !== '' &&
    register.password === confirmPassword;

  const { redirectToLogin } = useAuthRedirect();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setRegister((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setConfirmPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
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
      redirectToLogin();
    }
  };

  const validateForm = (): {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  } => {
    const validationErrors: {
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
    } = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    if (!register.firstName.trim()) {
      validationErrors.firstName = 'First Name is required';
    }

    if (!register.lastName.trim()) {
      validationErrors.lastName = 'Last Name is required';
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

    if (register.password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    return validationErrors;
  };

  const isValidEmail = (email: string): boolean => {
    // Email validation regex
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
            />
            {errors.firstName && <div className='error-message'>{errors.firstName}</div>}
          </div>
          <div className={`register__field ${errors.lastName ? 'error' : ''}`}>
            <Input
              label='Last Name'
              type='text'
              name='lastName'
              value={register.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <div className='error-message'>{errors.lastName}</div>}
          </div>
        </div>
        <div className={`register__field ${errors.email ? 'error' : ''}`}>
          <Input
            label='Email'
            type='text'
            name='email'
            value={register.email}
            onChange={handleChange}
          />
          {errors.email && <div className='error-message'>{errors.email}</div>}
        </div>
        <div className={`register__field ${errors.username ? 'error' : ''}`}>
          <Input
            label='Username'
            type='text'
            name='username'
            value={register.username}
            onChange={handleChange}
          />
          {errors.username && <div className='error-message'>{errors.username}</div>}
        </div>
        <div className={`register__field ${errors.password ? 'error' : ''}`}>
          <InputPassword
            confirmPassword={false}
            value={register.password}
            onChange={handleChange}
          />
          {errors.password && <div className='error-message'>{errors.password}</div>}
        </div>
        <div className={`register__field ${errors.confirmPassword ? 'error' : ''}`}>
          <InputPassword
            confirmPassword={true}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {errors.confirmPassword && <div className='error-message'>{errors.confirmPassword}</div>}
        </div>
        <Button size='medium' type='success' disabled={!isFormValid} onClick={handleSubmit}>
          Register
        </Button>
      </div>
      <div className='register__login'>
        Already have an Account?
        <Link to='/login' className='register__login-link'>
          Login Now!
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;

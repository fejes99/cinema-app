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

  const isFormValid = Object.values(login).every((value) => value !== '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLogin((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (): void => onSubmit(login);

  return (
    <div className='login'>
      <div className='login__title'>Login</div>
      <form className='login__form' onSubmit={handleSubmit}>
        <div className='login__field'>
          <Input
            label='Email'
            type='text'
            name='email'
            value={login.email}
            onChange={handleChange}
          />
        </div>
        <div className='login__field'>
          <InputPassword confirmPassword={false} value={login.password} onChange={handleChange} />
        </div>
        <Button size='medium' type='success' disabled={!isFormValid}>
          Login
        </Button>
      </form>

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

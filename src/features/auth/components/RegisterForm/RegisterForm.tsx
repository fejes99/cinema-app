import React, { useState } from 'react';
import Input from 'common/components/UI/Input/Input';
import { RegisterDto } from 'features/auth/types/RegisterDto';
import './RegisterForm.scss';
import Button from 'common/components/UI/Button/Button';
import InputPassword from 'common/components/UI/Input/InputPassword/InputPassword';
import { Link } from 'react-router-dom';

interface Props {}

const RegisterForm: React.FC<Props> = () => {
  const [register, setRegister] = useState<RegisterDto>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setRegister((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(register);
  };

  return (
    <div className='register'>
      <div className='register__title'>Register</div>
      <form className='register__form' onSubmit={handleSubmit}>
        <div className='register__name-wrapper'>
          <div className='register__field register__field-name'>
            <Input
              label='First Name'
              type='text'
              name='firstName'
              value={register.firstName}
              onChange={handleChange}
            />
          </div>
          <div className='register__field register__field-name'>
            <Input
              label='Last Name'
              type='text'
              name='lastName'
              value={register.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='register__field'>
          <Input
            label='Email'
            type='text'
            name='email'
            value={register.email}
            onChange={handleChange}
          />
        </div>
        <div className='register__field'>
          <Input
            label='Username'
            type='text'
            name='username'
            value={register.username}
            onChange={handleChange}
          />
        </div>
        <div className='register__field'>
          <InputPassword value={register.password} onChange={handleChange} />
        </div>
        <Button size='medium' type='success'>
          Register
        </Button>
      </form>
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

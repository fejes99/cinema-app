import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch } from 'store/store';
import { register } from '../state/authActions';
import { RegisterDto } from '../types/RegisterDto';
import RegisterForm from '../components/RegisterForm/RegisterForm';

interface Props {
  onRegister: (registerData: RegisterDto) => void;
}

const RegisterContainer: React.FC<Props> = ({ onRegister }) => (
  <>
    <div className='page-header'>Register</div>
    <RegisterForm onSubmit={onRegister} />
  </>
);

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onRegister: (registerData: RegisterDto) => dispatch(register(registerData)),
});

export default connect(null, mapDispatchToProps)(RegisterContainer);

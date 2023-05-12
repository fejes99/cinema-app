import React from 'react';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { connect } from 'react-redux';
import { AppDispatch } from 'store/store';
import { RegisterDto } from '../types/RegisterDto';
import { register } from '../state/authActions';

interface Props {
  onRegister: (registerData: RegisterDto) => void;
}

const RegisterContainer: React.FC<Props> = ({ onRegister }) => (
  <RegisterForm onSubmit={onRegister} />
);

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onRegister: (registerData: RegisterDto) => dispatch(register(registerData)),
});

export default connect(null, mapDispatchToProps)(RegisterContainer);

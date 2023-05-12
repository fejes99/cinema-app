import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import { connect } from 'react-redux';
import { AppDispatch } from 'store/store';
import { LoginDto } from '../types/LoginDto';
import { login } from '../state/authActions';

interface Props {
  onLogin: (loginData: LoginDto) => void;
}

const LoginContainer: React.FC<Props> = ({ onLogin }) => <LoginForm onSubmit={onLogin} />;

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onLogin: (loginData: LoginDto) => dispatch(login(loginData)),
});

export default connect(null, mapDispatchToProps)(LoginContainer);

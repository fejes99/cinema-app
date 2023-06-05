import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import { AppDispatch } from 'store/store';
import { login } from '../state/authActions';
import { LoginDto } from '../types/LoginDto';
import { useProjectionRedirect } from 'features/projections/hooks/projectionRedirects';
import LoginForm from '../components/LoginForm/LoginForm';

interface Props {
  onLogin: (loginData: LoginDto) => void;
}

const LoginContainer: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { redirectToProjectionList } = useProjectionRedirect();

  const handleLogin = (loginData: LoginDto): void => {
    onLogin(loginData);
    redirectToProjectionList();
    // navigate(-1);
  };

  return (
    <>
      <div className='page-header'>Login</div>
      <LoginForm onSubmit={handleLogin} />;
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onLogin: (loginData: LoginDto) => dispatch(login(loginData)),
});

export default connect(null, mapDispatchToProps)(LoginContainer);

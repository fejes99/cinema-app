import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { Error } from 'common/types/Error';
import { LoginDto } from '../types/LoginDto';

import { login } from '../state/authActions';
import { AppDispatch, StoreState } from 'store/store';

import { useProjectionRedirect } from 'features/projections/hooks/projectionRedirects';

import LoginForm from '../components/LoginForm/LoginForm';

interface Props {
  error: Error | null;
  onLogin: (loginData: LoginDto) => any;
}

const LoginContainer: React.FC<Props> = ({ error, onLogin }) => {
  const { redirectToProjectionList } = useProjectionRedirect();

  const handleLogin = async (loginData: LoginDto) => {
    try {
      await onLogin(loginData);
      redirectToProjectionList();
    } catch (err: any) {
      toast.error(error?.detail);
    }
  };

  return (
    <>
      <div className='page-header'>Login</div>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onLogin: (loginData: LoginDto) => dispatch(login(loginData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

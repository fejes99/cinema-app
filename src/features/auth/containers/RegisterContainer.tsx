import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch, StoreState } from 'store/store';
import { register } from '../state/authActions';
import { RegisterDto } from '../types/RegisterDto';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { Error } from 'common/types/Error';
import { toast } from 'react-toastify';
import { useProjectionRedirect } from 'features/projections/hooks/projectionRedirects';

interface Props {
  error: Error | null;
  onRegister: (registerData: RegisterDto) => any;
}

const RegisterContainer: React.FC<Props> = ({ error, onRegister }) => {
  const { redirectToProjectionList } = useProjectionRedirect();

  const handleRegister = async (registerData: RegisterDto) => {
    try {
      await onRegister(registerData);
      redirectToProjectionList();
    } catch (err: any) {
      toast.error(error?.detail);
    }
  };

  return (
    <>
      <div className='page-header'>Register</div>
      <RegisterForm onSubmit={handleRegister} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onRegister: (registerData: RegisterDto) => dispatch(register(registerData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);

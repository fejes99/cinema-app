import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { logout } from '../state/authActions';
import { User } from '../types/User';
import Loader from 'common/components/UI/Loader/Loader';
import UserDetails from '../components/UserDetails/UserDetails';
import Button from 'common/components/UI/Button/Button';
import { useProjectionRedirect } from 'features/projections/hooks/projectionRedirects';

interface Props {
  user: User | null;
  loading: boolean;
  error: Error;
  onLogout: () => void;
}

const ProfileContainer: React.FC<Props> = ({ user, loading, error, onLogout }) => {
  const { redirectToProjectionList } = useProjectionRedirect();

  if (loading) return <Loader />;
  if (user === null) return <div>No user</div>;
  if (error) return <div>error</div>;

  const handleLogoutClick = () => {
    onLogout();
    redirectToProjectionList();
  };

  return (
    <>
      <UserDetails user={user} />
      <Button type='primary' size='large' onClick={handleLogoutClick}>
        Logout
      </Button>
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.auth.loggedUser,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

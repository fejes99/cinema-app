import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { fetchUser } from '../state/authActions';
import { User } from '../types/User';
import { useParams } from 'react-router';
import Loader from 'common/components/UI/Loader/Loader';
import UserDetails from '../components/UserDetails/UserDetails';
import AdminButtonGroup from 'common/components/UI/AdminButtonGroup/AdminButtonGroup';
import { useAuthRedirect } from '../hooks/authRedirects';

interface Props {
  selectedUser: User | null;
  loading: boolean;
  error: Error;
  onFetchUser: (id: string) => void;
}

const UserDetailsContainer: React.FC<Props> = ({ selectedUser, loading, error, onFetchUser }) => {
  const { id } = useParams();

  const { redirectToUserUpdate } = useAuthRedirect();

  useEffect(() => {
    if (id) onFetchUser(id);
  }, [id, onFetchUser]);

  if (loading) return <Loader />;
  if (selectedUser === null) return <div>No user</div>;
  if (error) return <div>{error.message}</div>;

  const handleEditClick = () => redirectToUserUpdate(selectedUser.id);
  const handleDeleteClick = () => {};

  return (
    <>
      <AdminButtonGroup onEdit={handleEditClick} onDelete={handleDeleteClick} />
      <UserDetails user={selectedUser} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  selectedUser: state.auth.selectedUser,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchUser: (id: string) => dispatch(fetchUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsContainer);

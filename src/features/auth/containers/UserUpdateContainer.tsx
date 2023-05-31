import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { fetchUser, updateUser } from '../state/authActions';
import { UserUpdateDto } from '../types/UserUpdateDto';
import { User } from '../types/User';
import { Error } from 'common/types/Error';
import { useParams } from 'react-router';
import { useAuthRedirect } from '../hooks/authRedirects';
import Loader from 'common/components/UI/Loader/Loader';
import UserUpdateForm from '../components/UserUpdateForm/UserUpdateForm';

interface Props {
  user: User | null;
  loading: boolean;
  error: Error;
  onFetchUser: (id: string) => void;
  onUpdateUser: (id: string, userUpdateDto: UserUpdateDto) => void;
}

const UserUpdateContainer: React.FC<Props> = ({
  user,
  loading,
  error,
  onFetchUser,
  onUpdateUser,
}) => {
  const { id } = useParams();
  const { redirectToProfile } = useAuthRedirect();

  useEffect(() => {
    if (!user) onFetchUser(id!);
  }, [id, onFetchUser, user]);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  const handleUserUpdate = (id: string, userUpdateDto: UserUpdateDto) => {
    onUpdateUser(id, userUpdateDto);
    redirectToProfile();
  };

  return user && <UserUpdateForm user={user} update={handleUserUpdate} />;
};

const mapStateToProps = (state: StoreState) => ({
  user: state.auth.selectedUser!,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchUser: (id: string) => dispatch(fetchUser(id)),
  onUpdateUser: (id: string, userUpdateDto: UserUpdateDto) =>
    dispatch(updateUser(id, userUpdateDto)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdateContainer);

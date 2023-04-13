import React, { useEffect } from 'react';
import { AppDispatch, StoreState } from 'store/store';
import { fetchUsers } from '../state/authActions';
import { connect } from 'react-redux';
import { User } from '../types/User';
import UserList from '../components/UserList/UserList';
import Loader from 'common/components/UI/Loader/Loader';
import UserFilter from '../components/UserFilter/UserFilter';

interface Props {
  users: User[];
  loading: boolean;
  error: Error;
  onFetchUsers: () => void;
}

const UserListContainer: React.FC<Props> = ({ users, loading, error, onFetchUsers }) => {
  useEffect(() => onFetchUsers(), [onFetchUsers]);

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <UserFilter />
      <UserList users={users} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  users: state.auth.users,
  loading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);

import React, { useEffect, useState } from 'react';
import { AppDispatch, StoreState } from 'store/store';
import { fetchUsers } from '../state/authActions';
import { connect } from 'react-redux';
import { User } from '../types/User';
import UserList from '../components/UserList/UserList';
import Loader from 'common/components/UI/Loader/Loader';
import UserFilter from '../components/UserFilter/UserFilter';
import { UserFilterName, UserFilterValue, UserFilters } from '../types/UserFilters';
import { defaultUserFilters, userSearchFilter } from '../helpers/userFilters';

interface Props {
  users: User[];
  loading: boolean;
  error: Error;
  onFetchUsers: () => void;
}

const UserListContainer: React.FC<Props> = ({ users, loading, error, onFetchUsers }) => {
  const [filters, setFilters] = useState<UserFilters>(defaultUserFilters);

  useEffect(() => onFetchUsers(), [onFetchUsers]);

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  const roles = [...new Set(users.map((user) => user.role))];

  const handleFiltersChange = (userFilterName: UserFilterName, value: UserFilterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [userFilterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      query: defaultUserFilters.query,
      role: defaultUserFilters.role,
    }));
  };

  const filteredUsers = userSearchFilter(users, filters);

  return (
    <>
      <UserFilter
        roles={roles}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resetFilters={resetFilters}
      />
      <UserList users={filteredUsers} />
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

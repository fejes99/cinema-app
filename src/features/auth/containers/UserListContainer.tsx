import React, { useEffect, useState } from 'react';
import { AppDispatch, StoreState } from 'store/store';
import { deleteUser, fetchUsers } from '../state/authActions';
import { connect } from 'react-redux';
import { User } from '../types/User';
import Loader from 'common/components/UI/Loader/Loader';
import UserFilter from '../components/UserFilter/UserFilter';
import { UserFilterName, UserFilterValue, UserFilters } from '../types/UserFilters';
import { defaultUserFilters, userSearchFilter } from '../helpers/authFilters';
import UsersTable from '../components/UsersTable/UsersTable';
import useModal from 'common/hooks/useModal';
import DeleteModal from 'common/components/UI/Modals/DeleteModal/DeleteModal';

interface Props {
  users: User[];
  loading: boolean;
  error: Error;
  onFetchUsers: () => void;
  onDeleteUser: (userId: string) => void;
}

const UserListContainer: React.FC<Props> = ({
  users,
  loading,
  error,
  onFetchUsers,
  onDeleteUser,
}) => {
  const [userToDeleteId, setuserToDeleteId] = useState<string>('');
  const [userToDelete, setUserToDelete] = useState<User | undefined>();

  const [filters, setFilters] = useState<UserFilters>(defaultUserFilters);

  const { showDeleteModal, openDeleteModal, closeAllModals } = useModal();

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

  const handleEditClick = (id: string) => {};

  const handleDeleteClick = (id: string) => {
    const userToDelete = filteredUsers.find((user) => user.id === id);
    setUserToDelete(userToDelete);
    setuserToDeleteId(id);
    openDeleteModal();
  };

  const deleteModalConfirmation = async () => {
    await onDeleteUser(userToDeleteId);
    closeAllModals();
    onFetchUsers();
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
      <UsersTable
        users={filteredUsers}
        onEdit={(id: string) => {}}
        onDelete={(id: string) => handleDeleteClick(id)}
      />
      <DeleteModal
        title={userToDelete?.username!}
        show={showDeleteModal}
        onDelete={deleteModalConfirmation}
        onClose={closeAllModals}
      />
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
  onDeleteUser: (userId: string) => dispatch(deleteUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);

import React, { useEffect, useState } from 'react';
import { AppDispatch, StoreState } from 'store/store';
import { deleteUser, fetchUsers, updateUser } from '../state/authActions';
import { connect } from 'react-redux';
import { User } from '../types/User';
import Loader from 'common/components/UI/Loader/Loader';
import UserFilter from '../components/UserFilter/UserFilter';
import { UserFilterName, UserFilterValue, UserFilters } from '../types/UserFilters';
import { defaultUserFilters, userSearchFilter } from '../helpers/authFilters';
import UsersTable from '../components/UsersTable/UsersTable';
import useModal from 'common/hooks/useModal';
import DeleteModal from 'common/components/UI/Modals/DeleteModal/DeleteModal';
import UserRoleChangeModal from '../components/UserRoleChangeModal/UserRoleChangeModal';
import { UserUpdateDto } from '../types/UserUpdateDto';

interface Props {
  users: User[];
  loading: boolean;
  error: Error;
  onFetchUsers: () => void;
  onUpdateUser: (userId: string, userUpdateDto: UserUpdateDto) => void;
  onDeleteUser: (userId: string) => void;
}

const UserListContainer: React.FC<Props> = ({
  users,
  loading,
  error,
  onFetchUsers,
  onUpdateUser,
  onDeleteUser,
}) => {
  const [userToUpdateId, setuserToUpdateId] = useState<string>('');
  const [userToUpdate, setUserToUpdate] = useState<User | undefined>();

  const [userToDeleteId, setuserToDeleteId] = useState<string>('');
  const [userToDelete, setUserToDelete] = useState<User | undefined>();

  const [filters, setFilters] = useState<UserFilters>(defaultUserFilters);

  const { showUpdateModal, showDeleteModal, openUpdateModal, openDeleteModal, closeAllModals } =
    useModal();

  useEffect(() => onFetchUsers(), [onFetchUsers]);

  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  const roles: string[] = [...new Set(users.map((user) => user.role))];

  const handleFiltersChange = (userFilterName: UserFilterName, value: UserFilterValue): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [userFilterName]: value,
    }));
  };

  const resetFilters = (): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      query: defaultUserFilters.query,
      role: defaultUserFilters.role,
    }));
  };

  const handleEditClick = (id: string): void => {
    const userToUpdate = filteredUsers.find((user) => user.id === id);
    setUserToUpdate(userToUpdate);
    setuserToUpdateId(id);
    openUpdateModal();
  };

  const handleDeleteClick = (id: string): void => {
    const userToDelete = filteredUsers.find((user) => user.id === id);
    setUserToDelete(userToDelete);
    setuserToDeleteId(id);
    openDeleteModal();
  };

  const updateModalConfirmation = (userUpdateDto: UserUpdateDto): void =>
    onUpdateUser(userToUpdateId, userUpdateDto);

  const deleteModalConfirmation = (): void => {
    onDeleteUser(userToDeleteId);
    closeAllModals();
    onFetchUsers();
  };

  const filteredUsers: User[] = userSearchFilter(users, filters);

  return (
    <>
      <div className='page-header'>Users</div>
      <UserFilter
        roles={roles}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        resetFilters={resetFilters}
      />
      <UsersTable users={filteredUsers} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      <UserRoleChangeModal
        user={userToUpdate}
        roles={roles}
        show={showUpdateModal}
        onUpdate={updateModalConfirmation}
        onClose={closeAllModals}
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
  onUpdateUser: (userId: string, userUpdateDto: UserUpdateDto) =>
    dispatch(updateUser(userId, userUpdateDto)),
  onDeleteUser: (userId: string) => dispatch(deleteUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);

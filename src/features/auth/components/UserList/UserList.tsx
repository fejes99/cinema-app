import React from 'react';
import './UserList.scss';
import { User } from 'features/auth/types/User';
import UsersTable from './UsersTable/UsersTable';

interface Props {
  users: User[];
}

const UserList: React.FC<Props> = ({ users }) => {
  return (
    <div className='projection-list'>
      <UsersTable users={users} />
    </div>
  );
};

export default UserList;

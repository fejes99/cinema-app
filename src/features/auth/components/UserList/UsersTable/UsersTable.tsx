import { formatDate } from 'common/helpers/dateFormater';
import { useUserRedirect } from 'features/auth/helpers/userRedirects';
import { User } from 'features/auth/types/User';
import React from 'react';

interface Props {
  users: User[];
}

const UsersTable: React.FC<Props> = ({ users }) => {
  const { redirectToUserDetails } = useUserRedirect();

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Created</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user: User) => (
            <tr key={user.id} onClick={() => redirectToUserDetails(user.id)}>
              <td>{user.username}</td>
              <td>{formatDate(user.created)}</td>
              <td>{user.role}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
export default UsersTable;

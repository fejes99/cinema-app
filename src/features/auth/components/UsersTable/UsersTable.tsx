import React from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { formatDate } from 'common/helpers/formatDate';
import { User } from 'features/auth/types/User';
import { useUserRedirect } from 'features/auth/hooks/userRedirects';

interface Props {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UsersTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  const { redirectToUserDetails } = useUserRedirect();

  return (
    <table>
      <thead>
        <tr>
          <th className='align-left'>Username</th>
          <th>Created</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user: User) => (
            <tr key={user.id}>
              <td className='align-left '>
                <span className='pointer' onClick={() => redirectToUserDetails(user.id)}>
                  {user.username}
                </span>
              </td>
              <td>{formatDate(user.created)}</td>
              <td className='align-center'>{user.role}</td>
              <td className='icons'>
                <div onClick={() => onEdit(user.id)}>
                  <ModeEditOutlinedIcon className='edit-icon' />
                </div>
                <div onClick={() => onDelete(user.id)}>
                  <DeleteOutlinedIcon className='delete-icon' />
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UsersTable;

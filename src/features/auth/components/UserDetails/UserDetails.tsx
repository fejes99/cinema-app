import React from 'react';
import './UserDetails.scss';
import { User } from 'features/auth/types/User';
import { formatDate } from 'common/helpers/formatDate';

interface Props {
  user: User;
}

const UserDetails: React.FC<Props> = ({ user }) => (
  <div className='user-details'>
    <div className='user-details__title'>
      {user.firstName} {user.lastName}
    </div>
    <div className='user-details__content'>
      <span className='bold'>Username:</span>
      {user.username}
    </div>
    <div className='user-details__content'>
      <span className='bold'>Email:</span> {user.email}
    </div>
    <div className='user-details__content'>
      <span className='bold'>Created:</span> {formatDate(user.created)}
    </div>
    <div className='user-details__content'>
      <span className='bold'>Role:</span>
      {user.role}
    </div>
  </div>
);

export default UserDetails;

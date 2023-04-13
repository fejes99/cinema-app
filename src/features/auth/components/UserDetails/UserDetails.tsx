import React from 'react';
import './UserDetails.scss';
import { User } from 'features/auth/types/User';
import { formatDate } from 'common/helpers/dateFormater';

interface Props {
  user: User;
}

const UserDetails: React.FC<Props> = ({ user }) => (
  <div className='user-details'>
    <div className='user-details__content'>Name: {user.firstName + user.lastName}</div>
    <div className='user-details__content'>Username: {user.username}</div>
    <div className='user-details__content'>Email: {user.email}</div>
    <div className='user-details__content'>Created: {formatDate(user.created)}</div>
    <div className='user-details__content'>Role: {user.role}</div>
  </div>
);

export default UserDetails;

import React from 'react';
import { Route, Routes } from 'react-router';

import UserListContainer from '../containers/UserListContainer';
import UserDetailsContainer from '../containers/UserDetailsContainer';
import UserUpdateContainer from '../containers/UserUpdateContainer';
import { User } from '../types/User';
import { isAdmin } from '../helpers/isAdmin';

interface Props {
  user: User;
}

const UserPage: React.FC<Props> = ({ user }) => (
  <Routes>
    <Route path='/' element={isAdmin(user) ? <UserListContainer /> : null} />
    <Route path=':id' element={<UserDetailsContainer />} />
    <Route path=':id/edit' element={<UserUpdateContainer />} />
  </Routes>
);

export default UserPage;

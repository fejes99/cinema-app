import React from 'react';
import { Route, Routes } from 'react-router';
import UserListContainer from '../containers/UserListContainer';
import UserDetailsContainer from '../containers/UserDetailsContainer';
import UserUpdateContainer from '../containers/UserUpdateContainer';

const UserPage: React.FC = () => (
  <Routes>
    <Route path='/' element={<UserListContainer />} />
    <Route path=':id' element={<UserDetailsContainer />} />
    <Route path=':id/edit' element={<UserUpdateContainer />} />
  </Routes>
);
export default UserPage;

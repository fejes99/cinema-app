import React from 'react';
import { Route, Routes } from 'react-router';
import UserListContainer from '../containers/UserListContainer';
import UserDetailsContainer from '../containers/UserDetailsContainer';

const UsersPage: React.FC = () => (
  <Routes>
    <Route path='/' element={<UserListContainer />} />
    <Route path=':id' element={<UserDetailsContainer />} />
  </Routes>
);
export default UsersPage;

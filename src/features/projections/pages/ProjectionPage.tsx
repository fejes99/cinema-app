import React from 'react';
import { Route, Routes } from 'react-router';

import ProjectionListContainer from '../containers/ProjectionListContainer';
import ProjectionCreateContainer from '../containers/ProjectionCreateContainer';
import ProjectionUpdateContainer from '../containers/ProjectionUpdateContainer';
import ProjectionDetailsContainer from '../containers/ProjectionDetailsContainer';
import { User } from 'features/auth/types/User';
import PrivateRoute from 'common/components/PrivateRoute/PrivateRoute';

interface Props {
  user: User | null;
}

const ProjectionPage: React.FC<Props> = ({ user }) => (
  <Routes>
    <Route path='/' element={<ProjectionListContainer />} />
    <Route path=':id' element={<ProjectionDetailsContainer />} />
    <Route
      path=':id/edit'
      element={
        <PrivateRoute isAuthenticated={Boolean(user)}>
          <ProjectionUpdateContainer />
        </PrivateRoute>
      }
    />
    <Route
      path='/new'
      element={
        <PrivateRoute isAuthenticated={Boolean(user)}>
          <ProjectionCreateContainer />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default ProjectionPage;

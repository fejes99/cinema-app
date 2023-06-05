import React from 'react';
import { Route, Routes } from 'react-router';

import ProjectionListContainer from '../containers/ProjectionListContainer';
import ProjectionCreateContainer from '../containers/ProjectionCreateContainer';
import ProjectionUpdateContainer from '../containers/ProjectionUpdateContainer';
import ProjectionDetailsContainer from '../containers/ProjectionDetailsContainer';

const ProjectionPage: React.FC = () => (
  <Routes>
    <Route path='/' element={<ProjectionListContainer />} />
    <Route path=':id' element={<ProjectionDetailsContainer />} />
    <Route path=':id/edit' element={<ProjectionUpdateContainer />} />
    <Route path='/new' element={<ProjectionCreateContainer />} />
  </Routes>
);

export default ProjectionPage;

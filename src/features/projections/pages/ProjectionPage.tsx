import React from 'react';
import { Route, Routes } from 'react-router';
import ProjectionListContainer from '../containers/ProjectionListContainer';
import ProjectionDetailsContainer from '../containers/ProjectionDetailsContainer';

const ProjectionPage: React.FC = () => (
  <Routes>
    <Route path='/' element={<ProjectionListContainer />} />
    <Route path=':id' element={<ProjectionDetailsContainer />} />
  </Routes>
);

export default ProjectionPage;

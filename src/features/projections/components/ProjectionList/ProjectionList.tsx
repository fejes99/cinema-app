import React from 'react';
import './ProjectionList.scss';
import { Projection } from 'features/projections/types/Projection';
import { useProjectionRedirect } from 'features/projections/helpers/projectionRedirects';
import ProjectionsTable from './ProjectionsTable/ProjectionsTable';

interface Props {
  projections: Projection[];
}

const ProjectionList: React.FC<Props> = ({ projections }) => {
  const { redirectToProjectionDetails } = useProjectionRedirect();

  return (
    <div className='projection-list'>
      <ProjectionsTable projections={projections} redirect={redirectToProjectionDetails} />
    </div>
  );
};

export default ProjectionList;

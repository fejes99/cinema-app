import React from 'react';
import './ProjectionList.scss';
import { Projection } from 'features/projections/types/Projection';
import Loader from 'common/components/UI/Loader/Loader';
import { useProjectionRedirect } from 'features/projections/helpers/projectionRedirects';
import ProjectionsTable from './ProjectionsTable/ProjectionsTable';

interface Props {
  loading: boolean;
  projections: Projection[];
  error: Error;
}

const ProjectionList: React.FC<Props> = ({ loading, projections, error }) => {
  const { redirectToProjectionDetails } = useProjectionRedirect();
  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className='projection-list'>
      <ProjectionsTable projections={projections} redirect={redirectToProjectionDetails} />
    </div>
  );
};

export default ProjectionList;

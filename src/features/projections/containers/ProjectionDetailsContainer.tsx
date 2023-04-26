import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState, AppDispatch } from 'store/store';
import { fetchProjection } from '../state/projectionActions';
import { Projection } from '../types/Projection';
import { useParams } from 'react-router';
import Loader from 'common/components/UI/Loader/Loader';
import ProjectionDetails from '../components/ProjectionDetails/ProjectionDetails';
import AdminButtonGroup from 'common/components/UI/AdminButtonGroup/AdminButtonGroup';
import { useProjectionRedirect } from '../helpers/projectionRedirects';

interface Props {
  selectedProjection: Projection | null;
  loading: boolean;
  error: Error;
  onFetchProjection: (id: string) => void;
}

const ProjectionDetailsContainer: React.FC<Props> = ({
  selectedProjection,
  loading,
  error,
  onFetchProjection,
}) => {
  const { id } = useParams();
  const { redirectToProjectionUpdate } = useProjectionRedirect();

  useEffect(() => {
    if (id) onFetchProjection(id);
  }, [id, onFetchProjection]);

  if (loading) return <Loader />;
  if (selectedProjection === null) return <div>No projection</div>;
  if (error) return <div>error</div>;

  const handleEditClick = () => redirectToProjectionUpdate(selectedProjection.id);

  const handleDeleteClick = () => {};

  return (
    <>
      <AdminButtonGroup onEdit={handleEditClick} onDelete={handleDeleteClick} />
      <ProjectionDetails projection={selectedProjection} />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  selectedProjection: state.projections.selectedProjection,
  loading: state.projections.loading,
  error: state.movies.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchProjection: (id: string) => dispatch(fetchProjection(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionDetailsContainer);

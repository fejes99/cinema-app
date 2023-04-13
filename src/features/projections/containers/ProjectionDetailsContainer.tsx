import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState, AppDispatch } from 'store/store';
import { fetchProjection } from '../state/projectionActions';
import { Projection } from '../types/Projection';
import { useParams } from 'react-router';
import Loader from 'common/components/UI/Loader/Loader';
import ProjectionDetails from '../components/ProjectionDetails/ProjectionDetails';

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
  useEffect(() => {
    if (id) onFetchProjection(id);
  }, [id, onFetchProjection]);

  if (loading) return <Loader />;
  if (selectedProjection === null) return <div>No projection</div>;
  if (error) return <div>error</div>;

  return (
    <>
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

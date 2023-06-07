import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { ProjectionUpdateDto } from '../types/ProjectionUpdateDto';
import { fetchProjection, updateProjection } from '../state/projectionActions';
import { fetchProjectionTypes } from 'features/projectionTypes/state/projectionTypeActions';
import { fetchTheaters } from 'features/theaters/state/theaterActions';
import { StoreState, AppDispatch } from 'store/store';
import { ProjectionType } from 'features/projectionTypes/types/ProjectionType';
import { Theater } from 'features/theaters/types/Theater';
import { Projection } from '../types/Projection';
import ProjectionUpdateForm from '../components/ProjectionUpdateForm/ProjectionUpdateForm';
import { useProjectionRedirect } from '../hooks/projectionRedirects';
import Loader from 'common/components/UI/Loader/Loader';
import { Error } from 'common/types/Error';

interface Props {
  projection: Projection | null;
  projectionTypes: ProjectionType[];
  theaters: Theater[];
  loading: boolean;
  error: Error | null;
  onFetchProjectionTypes: () => void;
  onFetchTheaters: () => void;
  onFetchProjection: (id: string) => void;
  onUpdateProjection: (id: string, projectionUpdateDto: ProjectionUpdateDto) => void;
}

const ProjectionUpdateContainer: React.FC<Props> = ({
  projection,
  projectionTypes,
  theaters,
  loading,
  error,
  onFetchProjectionTypes,
  onFetchTheaters,
  onFetchProjection,
  onUpdateProjection,
}) => {
  const { id } = useParams();
  const { redirectToProjectionList } = useProjectionRedirect();

  useEffect(() => {
    if (!projection) {
      onFetchProjection(id!);
    }
  }, [id, onFetchProjection, projection]);

  useEffect(() => {
    onFetchProjectionTypes();
    onFetchTheaters();
  }, [onFetchProjection, onFetchProjectionTypes, onFetchTheaters]);

  if (!projection || loading) return <Loader />;
  if (error) return <div>{error.detail}</div>;

  const handleProjectionUpdate = (id: string, projectionUpdateDto: ProjectionUpdateDto): void => {
    onUpdateProjection(id, projectionUpdateDto);
    redirectToProjectionList();
  };

  return (
    <>
      <div className='page-header'>Update Projection</div>
      <ProjectionUpdateForm
        projection={projection!}
        projectionTypes={projectionTypes}
        theaters={theaters}
        update={handleProjectionUpdate}
      />
    </>
  );
};

const mapStateToProps = (state: StoreState) => {
  const {
    projectionTypes,
    loading: projectionTypesLoading,
    error: projectionTypesError,
  } = state.projectionTypes;
  const { theaters, loading: theatersLoading, error: theatersError } = state.theaters;
  const projection = state.projections.selectedProjection;

  let loading = projectionTypesLoading || theatersLoading;
  let error = projectionTypesError || theatersError || null;

  return {
    projection,
    projectionTypes,
    theaters,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchProjectionTypes: () => dispatch(fetchProjectionTypes()),
  onFetchTheaters: () => dispatch(fetchTheaters()),
  onFetchProjection: (id: string) => dispatch(fetchProjection(id)),
  onUpdateProjection: (id: string, projectionUpdateDto: ProjectionUpdateDto) =>
    dispatch(updateProjection(id, projectionUpdateDto)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionUpdateContainer);

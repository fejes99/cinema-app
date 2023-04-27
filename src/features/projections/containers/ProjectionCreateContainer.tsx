import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { ProjectionCreateDto } from '../types/ProjectionCreateDto';
import ProjectionCreateForm from '../components/ProjectionCreateForm/ProjectionCreateForm';
import { fetchMovies } from 'features/movies/state/movieActions';
import { fetchProjectionTypes } from 'features/projectionTypes/state/projectionTypeActions';
import { ProjectionType } from 'features/projectionTypes/types/ProjectionType';
import { Movie } from 'features/movies/types/Movie';
import { fetchTheaters } from 'features/theaters/state/theaterActions';
import { Theater } from 'features/theaters/types/Theater';
import Loader from 'common/components/UI/Loader/Loader';
import { useProjectionRedirect } from '../hooks/useProjectionRedirect';
import { createProjection } from '../state/projectionActions';

interface Props {
  movies: Movie[];
  projectionTypes: ProjectionType[];
  theaters: Theater[];
  isLoading: boolean;
  error: string | null;
  onCreateProjection: (projectionCreateDto: ProjectionCreateDto) => void;
  onFetchMovies: () => void;
  onFetchProjectionTypes: () => void;
  onFetchTheaters: () => void;
}

const ProjectionCreateContainer: React.FC<Props> = ({
  movies,
  projectionTypes,
  theaters,
  isLoading,
  error,
  onFetchMovies,
  onFetchProjectionTypes,
  onFetchTheaters,
  onCreateProjection,
}) => {
  const { redirectToProjectionList } = useProjectionRedirect();

  useEffect(() => {
    onFetchMovies();
    onFetchProjectionTypes();
    onFetchTheaters();
  }, [onFetchMovies, onFetchProjectionTypes, onFetchTheaters]);

  if (isLoading) return <Loader />;
  if (error) return <div>{error}</div>;

  const handleProjectionCreate = (projectionCreateDto: ProjectionCreateDto) => {
    onCreateProjection(projectionCreateDto);
    redirectToProjectionList();
  };

  return (
    <>
      <ProjectionCreateForm
        movies={movies}
        projectionTypes={projectionTypes}
        theaters={theaters}
        create={handleProjectionCreate}
      />
    </>
  );
};

const mapStateToProps = (state: StoreState) => {
  const { movies, loading: moviesLoading, error: moviesError } = state.movies;
  const {
    projectionTypes,
    loading: projectionTypesLoading,
    error: projectionTypesError,
  } = state.projectionTypes;
  const { theaters, loading: theatersLoading, error: theatersError } = state.theaters;

  let isLoading = moviesLoading || projectionTypesLoading || theatersLoading;
  let error =
    moviesError?.message || projectionTypesError?.message || theatersError?.message || null;

  return {
    movies,
    projectionTypes,
    theaters,
    isLoading,
    error,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchMovies: () => dispatch(fetchMovies()),
  onFetchProjectionTypes: () => dispatch(fetchProjectionTypes()),
  onFetchTheaters: () => dispatch(fetchTheaters()),
  onCreateProjection: (projectionCreateDto: ProjectionCreateDto) =>
    dispatch(createProjection(projectionCreateDto)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionCreateContainer);

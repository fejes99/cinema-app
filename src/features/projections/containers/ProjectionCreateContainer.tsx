import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AppDispatch, StoreState } from 'store/store';
import { createProjection } from '../state/projectionActions';

import { Movie } from 'features/movies/types/Movie';
import { Theater } from 'features/theaters/types/Theater';
import { ProjectionType } from 'features/projectionTypes/types/ProjectionType';
import { ProjectionCreateDto } from '../types/ProjectionCreateDto';

import { useProjectionRedirect } from '../hooks/projectionRedirects';

import { fetchMovies } from 'features/movies/state/movieActions';
import { fetchTheaters } from 'features/theaters/state/theaterActions';
import { fetchProjectionTypes } from 'features/projectionTypes/state/projectionTypeActions';

import Loader from 'common/components/UI/Loader/Loader';
import ProjectionCreateForm from '../components/ProjectionCreateForm/ProjectionCreateForm';
import { Error } from 'common/types/Error';

interface Props {
  movies: Movie[];
  projectionTypes: ProjectionType[];
  theaters: Theater[];
  isLoading: boolean;
  error: Error | null;
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
  const [updatedProjectionTypes, setUpdatedProjectionTypes] =
    useState<ProjectionType[]>(projectionTypes);
  const { redirectToProjectionList } = useProjectionRedirect();

  useEffect(() => {
    onFetchMovies();
    onFetchProjectionTypes();
    onFetchTheaters();
  }, [onFetchMovies, onFetchProjectionTypes, onFetchTheaters]);

  if (isLoading) return <Loader />;
  if (error) return <div>{error.detail}</div>;

  const handleProjectionCreate = (projectionCreateDto: ProjectionCreateDto): void => {
    onCreateProjection(projectionCreateDto);
    redirectToProjectionList();
  };

  const updateProjectionTypes = (theaterName: string): void => {
    const theater: Theater | undefined = theaters.find((theater) => theater.name === theaterName);
    if (theater) {
      const updatedTypes: ProjectionType[] = projectionTypes.filter((projectionType) =>
        theater.projectionTypes.some((type) => type.name === projectionType.name)
      );

      setUpdatedProjectionTypes(updatedTypes);
    }
  };

  return (
    <>
      <div className='page-header'>Create Projection</div>
      <ProjectionCreateForm
        movies={movies}
        projectionTypes={updatedProjectionTypes}
        theaters={theaters}
        theaterClick={updateProjectionTypes}
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
  let error = moviesError || projectionTypesError || theatersError || null;

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

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { AppDispatch, StoreState } from 'store/store';
import { fetchMovie, updateMovie } from '../state/movieActions';

import { useMovieRedirect } from '../hooks/movieRedirects';

import { Movie } from '../types/Movie';
import { Error } from 'common/types/Error';
import { MovieUpdateDto } from '../types/MovieUpdateDto';

import Loader from 'common/components/UI/Loader/Loader';
import MovieUpdateForm from '../components/MovieUpdateForm/MovieUpdateForm';
import PageNavigator from 'common/components/PageNavigator/PageNavigator';

interface Props {
  movie: Movie | null;
  loading: boolean;
  error: Error | null;
  onFetchMovie: (id: string) => void;
  onUpdateMovie: (id: string, movieUpdateDto: MovieUpdateDto) => void;
}

const MovieUpdateContainer: React.FC<Props> = ({
  movie,
  loading,
  error,
  onFetchMovie,
  onUpdateMovie,
}) => {
  const { id } = useParams();
  const { redirectToMovieDetails } = useMovieRedirect();

  useEffect(() => {
    if (!movie) onFetchMovie(id!);
  }, [id, movie, onFetchMovie]);

  if (loading) return <Loader />;
  if (error) return <div>{error.detail}</div>;

  const handleMovieUpdate = (id: string, movieUpdateDto: MovieUpdateDto): void => {
    onUpdateMovie(id, movieUpdateDto);
    redirectToMovieDetails(id);
  };

  return (
    <>
      <PageNavigator title='Update Movie' />
      {movie && <MovieUpdateForm movie={movie} update={handleMovieUpdate} />}
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  movie: state.movies.selectedMovie!,
  loading: state.movies.loading,
  error: state.movies.error,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onFetchMovie: (id: string) => dispatch(fetchMovie(id)),
  onUpdateMovie: (id: string, movieUpdateDto: MovieUpdateDto) =>
    dispatch(updateMovie(id, movieUpdateDto)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieUpdateContainer);

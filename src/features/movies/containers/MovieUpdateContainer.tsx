import React, { useEffect } from 'react';
import MovieUpdateForm from '../components/MovieUpdateForm/MovieUpdateForm';
import { MovieUpdateDto } from '../types/MovieUpdateDto';
import { Movie } from '../types/Movie';
import { connect } from 'react-redux';
import { AppDispatch, StoreState } from 'store/store';
import { useParams } from 'react-router';
import { fetchMovie, updateMovie } from '../state/movieActions';
import { Error } from 'common/types/Error';
import Loader from 'common/components/UI/Loader/Loader';
import { useMovieRedirect } from '../hooks/movieRedirects';

interface Props {
  movie: Movie | null;
  loading: boolean;
  error: Error;
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
  if (error) return <div>{error}</div>;

  const handleMovieUpdate = (id: string, movieUpdateDto: MovieUpdateDto) => {
    onUpdateMovie(id, movieUpdateDto);
    redirectToMovieDetails(id);
  };

  return movie && <MovieUpdateForm movie={movie} update={handleMovieUpdate} />;
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

import React from 'react';
import { Movie } from 'features/movies/types/Movie';
import { Error } from 'common/types/Error';
import Loader from 'common/components/UI/Loader/Loader';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.scss';

interface Props {
  loading: boolean;
  movies: Movie[];
  error: Error;
}

const MovieList: React.FC<Props> = ({ loading, movies, error }) => {
  if (loading) return <Loader />;
  if (error) return <div>{error.message}</div>;

  let movieCards =
    movies && movies.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />);

  return <div className='movie-list'>{movieCards}</div>;
};

export default MovieList;

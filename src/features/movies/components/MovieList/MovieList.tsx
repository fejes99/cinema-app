import React from 'react';
import { Movie } from 'features/movies/types/Movie';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.scss';

interface Props {
  movies: Movie[];
}

const MovieList: React.FC<Props> = ({ movies }) => (
  <div className='movie-list'>
    {movies && movies.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />)}
  </div>
);

export default MovieList;

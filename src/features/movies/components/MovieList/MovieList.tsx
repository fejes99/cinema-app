import React from 'react';
import { Movie } from 'features/movies/types/Movie';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.scss';

interface Props {
  movies: Movie[];
  buyTicket: (movie: Movie) => void;
}

const MovieList: React.FC<Props> = ({ movies, buyTicket }) => (
  <div className='movie-list'>
    {movies &&
      movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} buyTicket={buyTicket} />
      ))}
  </div>
);

export default MovieList;

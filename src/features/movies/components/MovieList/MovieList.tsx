import React from 'react';
import { Movie } from 'features/movies/types/Movie';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.scss';

interface Props {
  movies: Movie[];
  onBuyTicket: (movie: Movie) => void;
}

const MovieList: React.FC<Props> = ({ movies, onBuyTicket }) => (
  <div className='movie-list'>
    {movies &&
      movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} onBuyTicket={onBuyTicket} />
      ))}
  </div>
);

export default MovieList;

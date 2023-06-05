import React from 'react';

import './MovieList.scss';

import { Movie } from 'features/movies/types/Movie';
import MovieCard from '../MovieCard/MovieCard';

interface Props {
  movies: Movie[];
  onBuyTicket: (movie: Movie) => void;
  onDetails: (movieId: string) => void;
}

const MovieList: React.FC<Props> = ({ movies, onBuyTicket, onDetails }) => (
  <div className='movie-list'>
    {movies &&
      movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movie={movie} onBuyTicket={onBuyTicket} onDetails={onDetails} />
      ))}
  </div>
);

export default MovieList;

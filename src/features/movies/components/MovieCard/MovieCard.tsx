import React from 'react';
import { Movie } from 'features/movies/types/Movie';
import './MovieCard.scss';
import { useMovieRedirect } from 'features/movies/hooks/movieRedirects';

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const { redirectToMovieDetails } = useMovieRedirect();
  return (
    <div className='movie-card' onClick={() => redirectToMovieDetails(movie.id)}>
      <div className='movie-card__column movie-card__column-image'>
        <div
          className=' movie-card__image'
          // style={{ backgroundImage: `url(${movie.image})` }}
        ></div>
      </div>
      <div className='movie-card__column movie-card__column-content'>
        <div className='movie-card__name'>{movie.name}</div>
        <div className='movie-card__content movie-card__director'>
          <span className='bold'>Director:</span> {movie.director}
        </div>
        <div className='movie-card__content movie-card__duration'>
          <span className='bold'>Duration:</span> {movie.duration} min
        </div>
        <div className='movie-card__content movie-card__duration'>
          <span className='bold'>Distributor:</span> {movie.distributor}
        </div>
        <div className='movie-card__content movie-card__country'>
          <span className='bold'>Country:</span> {movie.country}
        </div>
        <div className='movie-card__year'>
          <span className='bold'>Year:</span> {movie.year}
        </div>
      </div>
      <div className='movie-card__column movie-card__column-projections'>Projecitons</div>
    </div>
  );
};

export default MovieCard;

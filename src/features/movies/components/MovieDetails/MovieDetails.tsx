import React from 'react';
import './MovieDetails.scss';
import { Movie } from 'features/movies/types/Movie';

interface Props {
  movie: Movie;
}

const MovieDetails: React.FC<Props> = ({
  movie: { name, director, distributor, duration, description, country, year },
}) => (
  <div className='movie-details'>
    <div className='movie-details__title'>{name}</div>
    <div className='movie-details__content'>
      <span className='bold'>Director: </span>
      {director}
    </div>
    <div className='movie-details__content'>
      <span className='bold'>Distributor: </span>
      {distributor}
    </div>
    <div className='movie-details__content'>
      <span className='bold'>Duration: </span>
      {duration}
    </div>
    <div className='movie-details__content'>
      <span className='bold'>Description: </span>
      {description}
    </div>
    <div className='movie-details__content'>
      <span className='bold'>Country: </span>
      {country}
    </div>
    <div className='movie-details__content'>
      <span className='bold'>Released: </span>
      {year}
    </div>
  </div>
);

export default MovieDetails;

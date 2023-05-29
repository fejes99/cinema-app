import React from 'react';
import './MovieDetails.scss';
import { Movie } from 'features/movies/types/Movie';
import Button from 'common/components/UI/Button/Button';
import { formatDuration } from 'common/helpers/formatDuration';

interface Props {
  movie: Movie;
  onBuyTicket: (movie: Movie) => void;
}

const MovieDetails: React.FC<Props> = ({ movie, onBuyTicket }) => {
  const formattedDescription = movie.description!.replace(/\n/g, '<br>');

  const handleBuyTicketClick = () => onBuyTicket(movie);

  return (
    <div className='movie-details'>
      <div className='movie-details__title'>{movie.name}</div>
      <div className='movie-details__row'>
        <div className='movie-details__row-content'>
          <span className='bold'>Director: </span>
          {movie.director}
        </div>
        <div className='movie-details__row-content'>
          <span className='bold'>Distributor: </span>
          {movie.distributor}
        </div>
        <div className='movie-details__row-content'>
          <span className='bold'>Duration: </span>
          {formatDuration(movie.duration)}
        </div>
      </div>
      <div
        className='movie-details__content'
        dangerouslySetInnerHTML={{ __html: formattedDescription }}
      />
      <div className='movie-details__row'>
        <div className='movie-details__content'>
          <span className='bold'>
            {movie.country} {movie.year}
          </span>
        </div>
        <div className='movie-details_button'>
          <Button size='large' type='primary' onClick={handleBuyTicketClick}>
            Buy Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

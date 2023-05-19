import React from 'react';
import './TicketCreateMovie.scss';
import { Movie } from 'features/movies/types/Movie';
import { formatDuration } from 'common/helpers/formatDuration';

interface Props {
  movie: Movie;
}

const TicketCreateMovie: React.FC<Props> = ({
  movie: { name, director, distributor, duration, description, country, year },
}) => {
  const formattedDescription = description!.replace(/\n/g, '<br>');

  return (
    <div className='ticket-create-movie'>
      <div className='ticket-create-movie__title'>{name}</div>
      <div className='ticket-create-movie__row'>
        <div className='ticket-create-movie__content'>
          <span className='bold'>Director:</span> {director}
        </div>
        <div className='ticket-create-movie__content'>
          <span className='bold'>Distributor:</span> {distributor}
        </div>
        <div className='ticket-create-movie__content'>
          <span className='bold'>Duration:</span> {formatDuration(duration)}
        </div>
        <div className='ticket-create-movie__content'>
          <span className='bold'>
            {country} {year}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketCreateMovie;

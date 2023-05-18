import React from 'react';
import './MovieDetails.scss';
import { Movie } from 'features/movies/types/Movie';
import Button from 'common/components/UI/Button/Button';
import { formatDuration } from 'common/helpers/formatDuration';

interface Props {
  movie: Movie;
}

const MovieDetails: React.FC<Props> = ({
  movie: { name, director, distributor, duration, description, country, year },
}) => {
  const formattedDescription = description!.replace(/\n/g, '<br>');

  return (
    <div className='movie-details'>
      <div className='movie-details__header'>{name}</div>
      <div className='movie-details__row'>
        <div className='movie-details__row-content'>
          <span className='bold'>Director: </span>
          {director}
        </div>
        <div className='movie-details__row-content'>
          <span className='bold'>Distributor: </span>
          {distributor}
        </div>
        <div className='movie-details__row-content'>
          <span className='bold'>Duration: </span>
          {formatDuration(duration)}
        </div>
      </div>
      <div
        className='movie-details__content'
        dangerouslySetInnerHTML={{ __html: formattedDescription }}
      />
      <div className='movie-details__row'>
        <div className='movie-details__content'>
          <span className='bold'>
            {country} {year}
          </span>
        </div>
        <div className='movie-details_button'>
          <Button size='large' type='primary'>
            Buy Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

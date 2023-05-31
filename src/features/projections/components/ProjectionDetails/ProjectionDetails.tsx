import React from 'react';
import './ProjectionDetails.scss';
import { formatDate } from 'common/helpers/formatDate';
import { Projection } from 'features/projections/types/Projection';
import Button from 'common/components/UI/Button/Button';
import { formatPrice } from 'common/helpers/formatPrice';

interface Props {
  projection: Projection;
  movieDetails: (movieId: string) => void;
  onBuyTicket: () => void;
}

const ProjectionDetails: React.FC<Props> = ({ projection, movieDetails, onBuyTicket }) => {
  const buyCardButton = projection.isSold ? (
    <div className='projection-details__button'>
      <Button size='medium' type='disabled' onClick={onBuyTicket}>
        Sold Out
      </Button>
    </div>
  ) : (
    <div className='projection-details__button'>
      <Button size='medium' type='primary' onClick={onBuyTicket}>
        Buy Ticket
      </Button>
    </div>
  );

  return (
    <div className='projection-details'>
      <div
        className='projection-details__title pointer'
        onClick={() => projection.movie && movieDetails(projection.movie.id)}
      >
        {projection.movie?.name}
      </div>
      <div className='projection-details__row'>
        <div className='projection-details__content'>
          <span className='bold'>Time:</span>
          {formatDate(projection.time)}
        </div>
        <div className='projection-details__content'>
          <span className='bold'>Projection type:</span>
          {projection.projectionType.name}
        </div>
        <div className='projection-details__content'>
          <span className='bold'>Theater:</span>
          {projection.theater.name}
        </div>
        <div className='projection-details__content'>
          <span className='bold'>Price:</span>
          {formatPrice(projection.price)}
        </div>
      </div>
      {buyCardButton}
    </div>
  );
};

export default ProjectionDetails;

import React from 'react';
import './ProjectionDetails.scss';
import { formatDate } from 'common/helpers/formatDate';
import { Projection } from 'features/projections/types/Projection';
import Button from 'common/components/UI/Button/Button';
import { formatPrice } from 'common/helpers/formatPrice';

interface Props {
  projection: Projection;
  onBuyTicket: () => void;
}

const ProjectionDetails: React.FC<Props> = ({ projection, onBuyTicket }) => {
  const buyCardButton = projection.isSold ? null : (
    <div className='projection-details__button'>
      <Button size='medium' type='primary' onClick={onBuyTicket}>
        Buy Ticket
      </Button>
    </div>
  );

  return (
    <div className='projection-details'>
      <div className='projection-details__title'>{projection.movie?.name}</div>
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

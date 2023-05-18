import React from 'react';
import './ProjectionDetails.scss';
import { formatDate } from 'common/helpers/formatDate';
import { Projection } from 'features/projections/types/Projection';
import Button from 'common/components/UI/Button/Button';

interface Props {
  projection: Projection;
  buyTicket: () => void;
}

const ProjectionDetails: React.FC<Props> = ({ projection, buyTicket }) => {
  const buyCardButton = projection.isSold ? null : (
    <div className='projection-details__button'>
      <Button size='medium' type='primary' onClick={buyTicket}>
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
          {projection.price},00 RSD
        </div>
      </div>
      {buyCardButton}
    </div>
  );
};

export default ProjectionDetails;

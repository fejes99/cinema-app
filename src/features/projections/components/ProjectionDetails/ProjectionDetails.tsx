import { formatDate } from 'common/helpers/dateFormater';
import { Projection } from 'features/projections/types/Projection';
import React from 'react';
import TicketsTable from './TicketsTable/TicketsTable';
import Button from 'common/components/UI/Button/Button';
import './ProjectionDetails.scss';

interface Props {
  projection: Projection;
}

const ProjectionDetails: React.FC<Props> = ({ projection }) => {
  const buyCardButton = projection.isSold ? null : (
    <div className='projection-details__button'>
      <Button size='medium' type='success'>
        Buy Card
      </Button>
    </div>
  );
  const ticketsTable =
    projection.tickets && projection.tickets.length > 0 ? (
      <TicketsTable tickets={projection.tickets} />
    ) : (
      <></>
    );

  return (
    <div className='projection-details'>
      <div className='projection-details__title'>{projection.movie?.name}</div>
      <div className='projection-details__content'>
        <span className='bold'>Time:</span>
        {formatDate(projection.time)}
      </div>
      <div className='projection-details__content'>
        <span className='bold'>Projection type:</span>
        {projection.projectionType}
      </div>
      <div className='projection-details__content'>
        <span className='bold'>Theater:</span>
        {projection.theater}
      </div>
      <div className='projection-details__content'>
        <span className='bold'>Price:</span>
        {projection.price}
      </div>
      {buyCardButton}
      {ticketsTable}
    </div>
  );
};

export default ProjectionDetails;

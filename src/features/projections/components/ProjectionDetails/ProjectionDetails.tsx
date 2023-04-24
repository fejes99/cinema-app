import { formatDate } from 'common/helpers/dateFormater';
import { Projection } from 'features/projections/types/Projection';
import React from 'react';
import TicketsTable from './TicketsTable/TicketsTable';
import Button from 'common/components/UI/Button/Button';

interface Props {
  projection: Projection;
}

const ProjectionDetails: React.FC<Props> = ({ projection }) => {
  const buyCardButton = projection.isSold ? (
    <></>
  ) : (
    <Button size='medium' type='success'>
      Buy Card
    </Button>
  );
  const ticketsTable =
    projection.tickets && projection.tickets.length > 0 ? (
      <TicketsTable tickets={projection.tickets} />
    ) : (
      <></>
    );

  return (
    <div className='projection-details'>
      <div className='projection-details__content'>Movie: {projection.movie?.name}</div>
      <div className='projection-details__content'>Time: {formatDate(projection.time)}</div>
      <div className='projection-details__content'>
        Projection type: {projection.projectionType}
      </div>
      <div className='projection-details__content'>Theater: {projection.theater}</div>
      <div className='projection-details__content'>Price: {projection.price}</div>
      {buyCardButton}
      {ticketsTable}
    </div>
  );
};

export default ProjectionDetails;

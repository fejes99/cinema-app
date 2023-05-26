import React from 'react';
import './TicketCreateDetails.scss';
import { Projection } from 'features/projections/types/Projection';
import { Seat } from 'features/theaters/types/Seat';
import { formatDate } from 'common/helpers/formatDate';
import { formatPrice } from 'common/helpers/formatPrice';

interface Props {
  projection: Projection;
  seats: Seat[];
}

const TicketCreateDetails: React.FC<Props> = ({ projection, seats }) => {
  const formatSeats = (seats: Seat[]) => {
    return seats.map((seat) => seat.number).join(', ');
  };

  return (
    <div className='ticket-create-details'>
      <div className='ticket-create-details__title'>Projection details</div>
      <div className='ticket-create-details__row'>
        <div className='ticket-create-details__section'>
          <div className='ticket-create-details__subtitle'>Projection:</div>
          <div className='ticket-create-details__content'>
            <span className='bold'>Movie:</span>
            {projection.movie?.name}
          </div>
          <div className='ticket-create-details__content'>
            <span className='bold'>Projection type:</span>
            {projection.projectionType.name}
          </div>
          <div className='ticket-create-details__content'>
            <span className='bold'>Time:</span>
            {formatDate(projection.time)}
          </div>
          <div className='ticket-create-details__content'>
            <span className='bold'>Projection price:</span>
            {formatPrice(projection.price)}
          </div>
        </div>
        <div className='ticket-create-details__section'>
          <div className='ticket-create-details__subtitle'>Tickets:</div>
          <div className='ticket-create-details__content'>
            <span className='bold'>Number of tickets:</span>
            {seats.length}
          </div>
          <div className='ticket-create-details__content'>
            {seats.length < 2 ? (
              <span className='bold'>Seat number:</span>
            ) : (
              <span className='bold'>Seat numbers:</span>
            )}
            {formatSeats(seats)}
          </div>
        </div>
        <div className='ticket-create-details__section'>
          <div className='ticket-create-details__subtitle'>Price:</div>
          <div className='ticket-create-details__content'>
            <span className='bold'>Total price:</span>
            {formatPrice(projection.price)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCreateDetails;

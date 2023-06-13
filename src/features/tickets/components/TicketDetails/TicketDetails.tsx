import React from 'react';

import './TicketDetails.scss';

import { Ticket } from '../../types/Ticket';

import { formatDate } from 'common/helpers/formatDate';
import { formatPrice } from 'common/helpers/formatPrice';
import { useMovieRedirect } from 'features/movies/hooks/movieRedirects';
import { useUserRedirect } from 'features/auth/hooks/userRedirects';

interface Props {
  ticket: Ticket;
}

const TicketDetails: React.FC<Props> = ({ ticket }) => {
  const { redirectToMovieDetails } = useMovieRedirect();
  const { redirectToUserDetails } = useUserRedirect();

  return (
    <div className='ticket-details'>
      <div className='ticket-details__title'>Created: {formatDate(ticket.created)}</div>
      <div className='ticket-details__row'>
        <div className='ticket-details__section'>
          <div className='ticket-details__subtitle'>Projection</div>
          <div className='ticket-details__content'>
            <span className='bold'>Movie:</span>{' '}
            <span
              className='underline pointer'
              onClick={() => redirectToMovieDetails(ticket.projection.movie?.id!)}
            >
              {ticket.projection.movie?.name}
            </span>
          </div>
          <div className='ticket-details__content'>
            <span className='bold'>Time:</span> {formatDate(ticket.projection.time)}
          </div>
          <div className='ticket-details__content'>
            <span className='bold'>Price</span> {formatPrice(ticket.projection.price)}
          </div>

          <div className='ticket-details__content'>
            <span className='bold'>Projection Type:</span> {ticket.projection.projectionType.name}
          </div>
        </div>

        <div className='ticket-details__section'>
          <div className='ticket-details__subtitle'>User</div>
          <div className='ticket-details__content'>
            <span className='bold'>Name:</span>{' '}
            <span
              className='underline pointer'
              onClick={() => redirectToUserDetails(ticket.user.id)}
            >
              {ticket.user.firstName} {ticket.user.lastName}
            </span>
          </div>
          <div className='ticket-details__content'>
            <span className='bold'>Username</span> {ticket.user.username}
          </div>
          <div className='ticket-details__content'>
            <span className='bold'>Email:</span> {ticket.user.email}
          </div>
        </div>

        <div className='ticket-details__section'>
          <div className='ticket-details__subtitle'>Seat</div>
          <div className='ticket-details__content'>
            <span className='bold'>Theater:</span> {ticket.projection.theater.name}
          </div>
          <div className='ticket-details__content'>
            <span className='bold'>Seat:</span> {ticket.seat.number}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;

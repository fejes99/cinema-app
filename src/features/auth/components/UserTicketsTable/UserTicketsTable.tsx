import { formatDate } from 'common/helpers/formatDate';
import { formatPrice } from 'common/helpers/formatPrice';
import { Ticket } from 'features/tickets/types/Ticket';
import React from 'react';

interface Props {
  tickets: Ticket[];
  ticketDetails: (ticketId: string) => void;
  projectionDetails: (projectionId: string) => void;
}

const UserTicketsTable: React.FC<Props> = ({ tickets, ticketDetails, projectionDetails }) => (
  <table>
    <thead>
      <tr>
        <th>Created</th>
        <th>Movie</th>
        <th>Projection Type</th>
        <th>Price</th>
        <th>Theater</th>
        <th>Seat</th>
      </tr>
    </thead>
    <tbody>
      {tickets.map((ticket: Ticket) => (
        <tr key={ticket.id}>
          <td>
            <span className='pointer' onClick={() => ticketDetails(ticket.id)}>
              {formatDate(ticket.created)}
            </span>
          </td>
          <td>
            <span className='pointer' onClick={() => projectionDetails(ticket.projection.id)}>
              {ticket.projection.movie?.name}
            </span>
          </td>
          <td>{ticket.projection.projectionType.name}</td>
          <td>{formatPrice(ticket.projection.price)}</td>
          <td>{ticket.projection.theater.name}</td>
          <td>{ticket.seat.number}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTicketsTable;

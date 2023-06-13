import React from 'react';

import { Ticket } from 'features/tickets/types/Ticket';

import { formatDate } from 'common/helpers/formatDate';

interface Props {
  tickets: Ticket[];
  onTicketClick: (ticketId: string) => void;
  onUserClick: (userId: string) => void;
}

const TicketsTable: React.FC<Props> = ({ tickets, onTicketClick, onUserClick }) => (
  <table>
    <thead>
      <tr>
        <th className='important'>Projection Time</th>
        <th className='important'>User</th>
        <th className='important'>Seat</th>
      </tr>
    </thead>
    <tbody>
      {tickets.map((ticket: Ticket) => (
        <tr key={ticket.id}>
          <td className='important'>
            <span className='pointer' onClick={() => onTicketClick(ticket.id)}>
              {formatDate(ticket.created)}
            </span>
          </td>
          <td className='important pointer'>
            <span className='pointer' onClick={() => onUserClick(ticket.user.id)}>
              {ticket.user.username}
            </span>
          </td>
          <td className='important'>{ticket.seat.number}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TicketsTable;

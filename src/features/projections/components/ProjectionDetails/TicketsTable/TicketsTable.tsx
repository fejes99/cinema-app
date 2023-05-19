import { formatDate } from 'common/helpers/formatDate';
import { Ticket } from 'features/tickets/types/Ticket';
import React from 'react';

interface Props {
  tickets: Ticket[];
  onTicketClick: (ticketId: string) => void;
  onUserClick: (userId: string) => void;
}

const TicketsTable: React.FC<Props> = ({ tickets, onTicketClick, onUserClick }) => (
  <table>
    <thead>
      <tr>
        <th>Projection Time</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
      {tickets.map((ticket: Ticket) => (
        <tr key={ticket.id}>
          <td className='pointer' onClick={() => onTicketClick(ticket.id)}>
            {formatDate(ticket.created)}
          </td>
          <td className='pointer' onClick={() => onUserClick(ticket.user.id)}>
            {ticket.user.username}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TicketsTable;

import { formatDate } from 'common/helpers/dateFormater';
import { Ticket } from 'features/tickets/types/Ticket';
import React from 'react';

interface Props {
  tickets: Ticket[];
}

const TicketsTable: React.FC<Props> = ({ tickets }) => {
  console.log('🚀 ~ file: TicketsTable.tsx:10 ~ tickets:', tickets);
  return (
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
            <td>{formatDate(ticket.created)}</td>
            <td>{ticket.user.username}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketsTable;

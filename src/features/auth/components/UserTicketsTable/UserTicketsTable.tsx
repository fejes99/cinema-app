import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { Ticket } from 'features/tickets/types/Ticket';
import { formatDate } from 'common/helpers/formatDate';
import { formatPrice } from 'common/helpers/formatPrice';

interface Props {
  tickets: Ticket[];
  ticketDetails: (ticketId: string) => void;
  projectionDetails: (projectionId: string) => void;
  onDelete: (id: string) => void;
}

const UserTicketsTable: React.FC<Props> = ({
  tickets,
  ticketDetails,
  projectionDetails,
  onDelete,
}) => (
  <table>
    <thead>
      <tr>
        <th className='align-left'>Created</th>
        <th className='align-left'>Movie</th>
        <th>Projection Type</th>
        <th>Price</th>
        <th>Theater</th>
        <th>Seat</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {tickets.map((ticket: Ticket) => (
        <tr key={ticket.id}>
          <td className='align-left'>
            <span className='pointer' onClick={() => ticketDetails(ticket.id)}>
              {formatDate(ticket.created)}
            </span>
          </td>
          <td className='align-left'>
            <span className='pointer' onClick={() => projectionDetails(ticket.projection.id)}>
              {ticket.projection.movie?.name}
            </span>
          </td>
          <td>{ticket.projection.projectionType.name}</td>
          <td className='align-right'>{formatPrice(ticket.projection.price)}</td>
          <td>{ticket.projection.theater.name}</td>
          <td>{ticket.seat.number}</td>
          <td>
            <div onClick={() => onDelete(ticket.id)}>
              <DeleteOutlinedIcon fontSize='large' className='delete-icon' />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTicketsTable;

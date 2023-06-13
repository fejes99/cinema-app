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
        <th className='important align-left'>Created</th>
        <th className='important align-left'>Movie</th>
        <th>Projection Type</th>
        <th className='important'>Price</th>
        <th>Theater</th>
        <th className='important'>Seat</th>
        <th className='important'>Action</th>
      </tr>
    </thead>
    <tbody>
      {tickets.map((ticket: Ticket) => (
        <tr key={ticket.id}>
          <td className='important align-left'>
            <span className='pointer' onClick={() => ticketDetails(ticket.id)}>
              {formatDate(ticket.created)}
            </span>
          </td>
          <td className='important align-left'>
            <span className='pointer' onClick={() => projectionDetails(ticket.projection.id)}>
              {ticket.projection.movie?.name}
            </span>
          </td>
          <td>{ticket.projection.projectionType.name}</td>
          <td className='important align-right'>{formatPrice(ticket.projection.price)}</td>
          <td>{ticket.projection.theater.name}</td>
          <td className='important'>{ticket.seat.number}</td>
          <td className='important'>
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

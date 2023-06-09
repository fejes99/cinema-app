import React from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

import { Projection } from 'features/projections/types/Projection';

import { formatDate } from 'common/helpers/formatDate';
import { formatPrice } from 'common/helpers/formatPrice';

interface Props {
  isAdmin: boolean;
  projections: Projection[];
  redirect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectionsTable: React.FC<Props> = ({
  isAdmin,
  projections,
  redirect,
  onEdit,
  onDelete,
}) => (
  <table>
    <thead>
      <tr>
        <th className='align-left'>Movie</th>
        <th>Time</th>
        <th>Projection</th>
        <th>Theater</th>
        <th className='padding-right'>Price</th>
        {isAdmin ? <th>Action</th> : null}
      </tr>
    </thead>
    <tbody>
      {projections &&
        projections.map((projection: Projection) => (
          <tr key={projection.id} className={projection.isSold ? 'sold' : ''}>
            <td className='align-left'>
              <span className='pointer' onClick={() => redirect(projection.id)}>
                {projection.movie?.name}
              </span>
            </td>
            <td className='align-right'>{formatDate(projection.time)}</td>
            <td>{projection.projectionType.name}</td>
            <td>{projection.theater.name}</td>
            <td className='align-right padding-right'>
              <span className='bold'>{formatPrice(projection.price)}</span>
            </td>
            {isAdmin ? (
              <td className='icons'>
                <div onClick={() => onEdit(projection.id)}>
                  <ModeEditOutlinedIcon fontSize='large' className='edit-icon' />
                </div>
                <div onClick={() => onDelete(projection.id)}>
                  <DeleteOutlinedIcon fontSize='large' className='delete-icon' />
                </div>
              </td>
            ) : null}
          </tr>
        ))}
    </tbody>
  </table>
);

export default ProjectionsTable;

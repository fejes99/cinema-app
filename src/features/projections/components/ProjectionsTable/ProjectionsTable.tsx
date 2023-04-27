import { formatDate } from 'common/helpers/dateFormater';
import { Projection } from 'features/projections/types/Projection';
import React from 'react';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import './ProjectionsTable.scss';

interface Props {
  projections: Projection[];
  redirect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProjectionsTable: React.FC<Props> = ({ projections, redirect, onEdit, onDelete }) => (
  <table>
    <thead>
      <tr>
        <th>Movie</th>
        <th>Time</th>
        <th>Projection</th>
        <th>Theater</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {projections &&
        projections.map((projection: Projection) => (
          <tr key={projection.id}>
            <td onClick={() => redirect(projection.id)}>
              <span className='bold'>{projection.movie?.name}</span>
            </td>
            <td>{formatDate(projection.time)}</td>
            <td>{projection.projectionType.name}</td>
            <td>{projection.theater.name}</td>
            <td>
              <span className='bold'>{projection.price} RSD</span>
            </td>
            <td>
              <div className='icon' onClick={() => onEdit(projection.id)}>
                <ModeEditOutlinedIcon className='edit-icon' />
              </div>
              <div className='icon' onClick={() => onDelete(projection.id)}>
                <DeleteOutlinedIcon className='delete-icon' />
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default ProjectionsTable;

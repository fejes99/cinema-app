import { formatDate } from 'common/helpers/dateFormater';
import { Projection } from 'features/projections/types/Projection';
import React from 'react';

interface Props {
  projections: Projection[];
  redirect: (id: string) => void;
}

const ProjectionsTable: React.FC<Props> = ({ projections, redirect }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Movie</th>
          <th>Time</th>
          <th>Projection</th>
          <th>Theater</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {projections &&
          projections.map((projection: Projection) => (
            <tr key={projection.id} onClick={() => redirect(projection.id)}>
              <td>{projection.movie?.name}</td>
              <td>{formatDate(projection.time)}</td>
              <td>{projection.projectionType}</td>
              <td>{projection.theater}</td>
              <td>{projection.price}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ProjectionsTable;

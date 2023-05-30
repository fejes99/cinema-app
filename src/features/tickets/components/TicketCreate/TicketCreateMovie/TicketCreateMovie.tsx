import React, { useEffect, useState } from 'react';
import './TicketCreateMovie.scss';
import { Movie } from 'features/movies/types/Movie';
import { formatDuration } from 'common/helpers/formatDuration';
import { formatDate } from 'common/helpers/formatDate';
import { Projection } from 'features/projections/types/Projection';

interface Props {
  movie: Movie;
  selectProjection: (projection: Projection) => void;
}

const TicketCreateMovie: React.FC<Props> = ({
  movie: { name, director, distributor, duration, country, year, projections },
  selectProjection,
}) => {
  const [activeProjection, setActiveProjection] = useState<Projection | null>(null);

  const handleProjectionClick = (projection: Projection) => {
    setActiveProjection(projection);
  };

  useEffect(() => {
    activeProjection && selectProjection(activeProjection);
  }, [activeProjection]);

  const projectionList =
    projections && projections.length > 0 ? (
      projections.map((projection) => (
        <div
          key={projection.id}
          className={
            !projection.isSold
              ? `ticket-create-movie__projection pointer ${
                  projection === activeProjection ? 'active' : ''
                } :  ''`
              : 'ticket-create-movie__projection pointer ticket-create-movie__projection-sold'
          }
          onClick={() => !projection.isSold && handleProjectionClick(projection)}
        >
          {formatDate(projection.time)}
        </div>
      ))
    ) : (
      <div className='bold'>There are no projections at the moment.</div>
    );

  return (
    <div className='ticket-create-movie'>
      <div className='ticket-create-movie__title'>{name}</div>
      <div className='ticket-create-movie__row'>
        <div className='ticket-create-movie__content'>
          <span className='bold'>Director:</span> {director}
        </div>
        <div className='ticket-create-movie__content'>
          <span className='bold'>Distributor:</span> {distributor}
        </div>
        <div className='ticket-create-movie__content'>
          <span className='bold'>Duration:</span> {formatDuration(duration)}
        </div>
        <div className='ticket-create-movie__content'>
          <span className='bold'>
            {country} {year}
          </span>
        </div>
      </div>
      <div className='ticket-create-movie__row'>
        <div className='ticket-create-movie__projections'>{projectionList}</div>
      </div>
    </div>
  );
};

export default TicketCreateMovie;

import React, { useState } from 'react';

import './TicketCreateMovie.scss';

import { Movie } from 'features/movies/types/Movie';
import { Projection } from 'features/projections/types/Projection';

import { formatDate } from 'common/helpers/formatDate';
import { formatDuration } from 'common/helpers/formatDuration';

interface Props {
  movie: Movie;
  selectProjection: (projection: Projection) => void;
}

const TicketCreateMovie: React.FC<Props> = ({ movie, selectProjection }) => {
  const [activeProjection, setActiveProjection] = useState<Projection | null>(null);

  const handleProjectionClick = (projection: Projection): void => {
    setActiveProjection(projection);
    selectProjection(projection);
  };

  const projectionList =
    movie.projections && movie.projections.length > 0 ? (
      movie.projections.map((projection) => (
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
      <div className='ticket-create-movie__title'>{movie.name}</div>
      <div className='ticket-create-movie__row'>
        <div className='ticket-create-movie__content'>
          <span className='bold'>Director:</span> {movie.director}
        </div>
        <div className='ticket-create-movie__content'>
          <span className='bold'>Distributor:</span> {movie.distributor}
        </div>
        <div className='ticket-create-movie__content'>
          <span className='bold'>Duration:</span> {formatDuration(movie.duration)}
        </div>
        <div className='ticket-create-movie__content'>
          <span className='bold'>
            {movie.country} {movie.year}
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

import React from 'react';
import './ProjectionDetails.scss';
import { formatDate } from 'common/helpers/formatDate';
import { Projection } from 'features/projections/types/Projection';
import Button from 'common/components/UI/Button/Button';
import { formatPrice } from 'common/helpers/formatPrice';
import YoutubeEmbed from 'common/components/UI/YoutubeEmbed/YoutubeEmbed';
import { extractYoutubeVideoId } from 'features/movies/helpers/movieGetVideoIdFromTrailer';

interface Props {
  projection: Projection;
  movieDetails: (movieId: string) => void;
  onBuyTicket: () => void;
}

const ProjectionDetails: React.FC<Props> = ({ projection, movieDetails, onBuyTicket }) => {
  console.log('🚀 ~ file: ProjectionDetails.tsx:15 ~ projection:', projection);
  const buyCardButton = projection.isSold ? (
    <div className='projection-details__buy-ticket'>
      <Button size='medium' type='disabled' onClick={onBuyTicket}>
        Sold Out
      </Button>
    </div>
  ) : (
    <div className='projection-details__buy-ticket'>
      <Button size='medium' type='primary' onClick={onBuyTicket}>
        Tickets
      </Button>
    </div>
  );

  return (
    <div className='projection-details'>
      <div className='projection-details__row'>
        <div className='projection-details__trailer'>
          <YoutubeEmbed
            videoId={
              projection.movie?.trailerUrl && extractYoutubeVideoId(projection.movie.trailerUrl)
            }
          />
        </div>
        <div className='projection-details__data'>
          <div className='projection-details__data-title'>Details</div>
          <div className='projection-details__content'>
            <span className='bold'>Movie: </span>
            {projection.movie?.name}
          </div>
          <div className='projection-details__content'>
            <span className='bold'>Time: </span>
            {formatDate(projection.time)}
          </div>
          <div className='projection-details__content'>
            <span className='bold'>Projection Type: </span>
            {projection.projectionType.name}
          </div>
          <div className='projection-details__content'>
            <span className='bold'>Theater: </span>
            {projection.theater.name}
          </div>
          <div className='projection-details__content'>
            <span className='bold'>Price: </span>
            {formatPrice(projection.price)}
          </div>
        </div>
      </div>

      {buyCardButton}
    </div>
  );
};

export default ProjectionDetails;

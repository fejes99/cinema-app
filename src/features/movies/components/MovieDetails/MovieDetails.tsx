import React from 'react';

import './MovieDetails.scss';

import { Movie } from 'features/movies/types/Movie';

import { formatDuration } from 'common/helpers/formatDuration';
import { extractYoutubeVideoId } from 'features/movies/helpers/movieGetVideoIdFromTrailer';

import Button from 'common/components/UI/Button/Button';
import YoutubeEmbed from 'common/components/UI/YoutubeEmbed/YoutubeEmbed';

interface Props {
  movie: Movie;
  onBuyTicket: (movie: Movie) => void;
}

const MovieDetails: React.FC<Props> = ({ movie, onBuyTicket }) => {
  const formattedDescription: string = movie.description!.replace(/\n/g, '<br>');

  const handleBuyTicketClick = (): void => onBuyTicket(movie);

  return (
    <div className='movie-details'>
      <div className='movie-details__title'>{movie.name}</div>
      <div className='movie-details__row'>
        <div className='movie-details__trailer'>
          <YoutubeEmbed videoId={extractYoutubeVideoId(movie.trailerUrl!)} />
        </div>
        <div className='movie-details__data'>
          <div className='movie-details__data-title'>Details</div>
          <div className='movie-details__content'>
            <span className='bold'>Director: </span>
            {movie.director}
          </div>
          <div className='movie-details__content'>
            <span className='bold'>Distributor: </span>
            {movie.distributor}
          </div>
          <div className='movie-details__content'>
            <span className='bold'>Duration: </span>
            {formatDuration(movie.duration)}
          </div>
          <div className='movie-details__content'>
            <span className='bold'>Country:</span> {movie.country}
          </div>
          <div className='movie-details__content'>
            <span className='bold'>Year:</span> {movie.year}
          </div>
        </div>
      </div>

      <div className='movie-details__description'>
        <div className='movie-details__description-title'>Description</div>
        <div
          className='movie-details__description-content'
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />
      </div>

      <div className='movie-details__buy-ticket'>
        <Button size='large' type='primary' onClick={handleBuyTicketClick}>
          Buy Ticket
        </Button>
      </div>
    </div>
  );
};

export default MovieDetails;

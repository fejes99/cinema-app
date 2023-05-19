import React from 'react';
import { Movie } from 'features/movies/types/Movie';
import './MovieCard.scss';
import { useMovieRedirect } from 'features/movies/hooks/movieRedirects';
import Button from 'common/components/UI/Button/Button';
import { formatDuration } from 'common/helpers/formatDuration';
import { useTicketRedirect } from 'features/tickets/hooks/ticketRedirects';

interface Props {
  movie: Movie;
  buyTicket: (movie: Movie) => void;
}

const MovieCard: React.FC<Props> = ({ movie, buyTicket }) => {
  const { redirectToMovieDetails } = useMovieRedirect();
  const { redirectToTicketCreate } = useTicketRedirect();

  const handleDetailsClick = () => redirectToMovieDetails(movie.id);

  const handleTicketClick = (movie: Movie) => {
    buyTicket(movie);
    redirectToTicketCreate();
  };

  return (
    <div className='movie-card'>
      <div className='movie-card__column movie-card__column-image'>
        <div className=' movie-card__image'></div>
      </div>
      <div className='movie-card__column movie-card__column-content'>
        <div className='movie-card__row'>
          <div className='movie-card__row'>
            <div className='movie-card__name'>{movie.name}</div>
          </div>

          <div className='movie-card__row'>
            <div className='movie-card__content-row'>
              <div className='movie-card__content'>
                <span className='bold'>{formatDuration(movie.duration)}</span>
              </div>
              <div className='movie-card__content'>
                <span className='bold'>
                  {movie.country} {movie.year}
                </span>
              </div>
            </div>
            <div className='movie-card__content'>
              <span className='bold'>Director:</span> {movie.director}
            </div>
            <div className='movie-card__content'>
              <span className='bold'>Distributor:</span> {movie.distributor}
            </div>
          </div>
        </div>

        <div className='movie-card__row'>
          <div className='movie-card__buttons'>
            <div className='movie-card__button'>
              <Button size='small' type='secondary' onClick={handleDetailsClick}>
                More
              </Button>
            </div>
            <div className='movie-card__button'>
              <Button size='small' type='primary' onClick={() => handleTicketClick(movie)}>
                Buy ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

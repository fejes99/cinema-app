import React from 'react';
import { Movie } from 'features/movies/types/Movie';
import './MovieCard.scss';
import { useMovieRedirect } from 'features/movies/hooks/movieRedirects';
import Button from 'common/components/UI/Button/Button';
import { formatDuration } from 'common/helpers/formatDuration';

interface Props {
  movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const { redirectToMovieDetails } = useMovieRedirect();

  const handleDetailsClick = () => redirectToMovieDetails(movie.id);

  const handleTicketClick = () => {};

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
              <Button size='small' type='primary'>
                Tickets
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

import React, { useState } from 'react';
import './MovieUpdateForm.scss';
import Input from 'common/components/UI/Input/Input';
import Button from 'common/components/UI/Button/Button';
import { Movie } from 'features/movies/types/Movie';
import { MovieUpdateDto } from 'features/movies/types/MovieUpdateDto';
import TextArea from 'common/components/UI/TextArea/TextArea';
import YoutubeEmbed from 'common/components/UI/YoutubeEmbed/YoutubeEmbed';
import { extractYoutubeVideoId } from 'features/movies/helpers/movieGetVideoIdFromTrailer';

interface Props {
  movie: Movie;
  update: (id: string, movieUpdateDto: MovieUpdateDto) => void;
}

const MovieUpdateForm: React.FC<Props> = ({ movie, update }) => {
  const [movieUpdate, setMovieUpdate] = useState<MovieUpdateDto>({
    name: movie.name,
    director: movie.director,
    duration: movie.duration,
    distributor: movie.distributor,
    description: movie.description || '',
    country: movie.country,
    year: movie.year,
    trailerUrl: movie.trailerUrl || '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setMovieUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    update(movie.id, movieUpdate);
  };

  return (
    <div className='movie-update'>
      <div className='movie-update__title'>Update Movie</div>
      <form className='movie-update__form' onSubmit={handleSubmit}>
        <div className='movie-update__field'>
          <Input
            label='Name'
            type='text'
            name='name'
            value={movieUpdate.name}
            onChange={handleChange}
          />
        </div>
        <div className='movie-update__field'>
          <Input
            label='Director'
            type='text'
            name='director'
            value={movieUpdate.director}
            onChange={handleChange}
          />
        </div>
        <div className='movie-update__field'>
          <Input
            label='Duration'
            type='number'
            name='duration'
            value={movieUpdate.duration}
            onChange={handleChange}
          />
        </div>
        <div className='movie-update__field'>
          <Input
            label='Distributor'
            type='text'
            name='distributor'
            value={movieUpdate.distributor}
            onChange={handleChange}
          />
        </div>
        <div className='movie-update__field'>
          <TextArea
            label='Description'
            name='description'
            value={movieUpdate.description}
            onChange={handleChange}
          />
        </div>
        <div className='movie-update__field'>
          <Input
            label='Country'
            type='text'
            name='country'
            value={movieUpdate.country}
            onChange={handleChange}
          />
        </div>
        <div className='movie-update__field'>
          <Input
            label='Year'
            type='number'
            name='year'
            value={movieUpdate.year}
            min={1900}
            max={2100}
            onChange={handleChange}
          />
        </div>
        <div className='movie-update__field'>
          <Input
            label='Trailer URL'
            type='text'
            name='trailerUrl'
            value={movieUpdate.trailerUrl}
            onChange={handleChange}
          />
        </div>
        {movie.trailerUrl ? (
          <div className='movie-create__video'>
            <YoutubeEmbed videoId={extractYoutubeVideoId(movie.trailerUrl)} />
          </div>
        ) : null}
        <Button size='medium' type='success'>
          Update
        </Button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;

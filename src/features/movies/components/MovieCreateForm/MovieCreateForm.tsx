import React, { useState } from 'react';
import './MovieCreateForm.scss';
import { CreateMovieDto } from 'features/movies/types/MovieCreateDto';
import { extractYoutubeVideoId } from 'features/movies/helpers/movieGetVideoIdFromTrailer';
import Input from 'common/components/UI/Input/Input';
import Button from 'common/components/UI/Button/Button';
import TextArea from 'common/components/UI/TextArea/TextArea';
import YoutubeEmbed from 'common/components/UI/YoutubeEmbed/YoutubeEmbed';

interface Props {
  create: (createMovieDto: CreateMovieDto) => void;
}

const MovieCreateForm: React.FC<Props> = ({ create }) => {
  const [movie, setMovie] = useState<CreateMovieDto>({
    name: '',
    director: '',
    duration: 0,
    distributor: '',
    description: '',
    country: '',
    year: 0,
    trailerUrl: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setMovie((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    create(movie);
  };

  return (
    <div className='movie-create'>
      <div className='movie-create__title'>Create Movie</div>
      <form className='movie-create__form' onSubmit={handleSubmit}>
        <div className='movie-create__field'>
          <Input label='Name' type='text' name='name' value={movie.name} onChange={handleChange} />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Director'
            type='text'
            name='director'
            value={movie.director}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Duration'
            type='number'
            name='duration'
            value={movie.duration}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Distributor'
            type='text'
            name='distributor'
            value={movie.distributor}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <TextArea
            label='Description'
            name='description'
            value={movie.description}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Country'
            type='text'
            name='country'
            value={movie.country}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Year'
            type='number'
            name='year'
            value={movie.year}
            min={1900}
            max={2100}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Trailer URL'
            type='text'
            name='trailerUrl'
            value={movie.trailerUrl!}
            onChange={handleChange}
          />
        </div>
        {movie.trailerUrl ? (
          <div className='movie-create__video'>
            <YoutubeEmbed videoId={extractYoutubeVideoId(movie.trailerUrl)} />
          </div>
        ) : null}
        <Button size='medium' type='success'>
          Create
        </Button>
      </form>
    </div>
  );
};

export default MovieCreateForm;

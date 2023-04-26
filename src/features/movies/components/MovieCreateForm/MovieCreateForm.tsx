import React, { useState } from 'react';
import './MovieCreateForm.scss';
import { MovieCreateDto } from 'features/movies/types/MovieCreateDto';
import { extractYoutubeVideoId } from 'features/movies/helpers/movieGetVideoIdFromTrailer';
import Input from 'common/components/UI/Input/Input';
import Button from 'common/components/UI/Button/Button';
import TextArea from 'common/components/UI/TextArea/TextArea';
import YoutubeEmbed from 'common/components/UI/YoutubeEmbed/YoutubeEmbed';
import { useNavigate } from 'react-router';

interface Props {
  create: (movieCreateDto: MovieCreateDto) => void;
}

const MovieCreateForm: React.FC<Props> = ({ create }) => {
  const navigate = useNavigate();
  const [newMovie, setNewMovie] = useState<MovieCreateDto>({
    name: '',
    director: '',
    duration: 0,
    distributor: '',
    description: '',
    country: '',
    year: 0,
    trailerUrl: '',
  });
  const isFormValid = Object.values(newMovie).every((value) => value !== '' && value !== 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setNewMovie((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (): void => {
    create(newMovie);
    navigate('/movies');
  };

  return (
    <div className='movie-create'>
      <div className='movie-create__title'>Create Movie</div>
      <div className='movie-create__form'>
        <div className='movie-create__field'>
          <Input
            label='Name'
            type='text'
            name='name'
            value={newMovie.name}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Director'
            type='text'
            name='director'
            value={newMovie.director}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Duration'
            type='number'
            name='duration'
            value={newMovie.duration}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Distributor'
            type='text'
            name='distributor'
            value={newMovie.distributor}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <TextArea
            label='Description'
            name='description'
            value={newMovie.description}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Country'
            type='text'
            name='country'
            value={newMovie.country}
            onChange={handleChange}
          />
        </div>
        <div className='movie-create__field'>
          <Input
            label='Year'
            type='number'
            name='year'
            value={newMovie.year}
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
            value={newMovie.trailerUrl!}
            onChange={handleChange}
          />
        </div>
        {newMovie.trailerUrl ? (
          <div className='movie-create__video'>
            <YoutubeEmbed videoId={extractYoutubeVideoId(newMovie.trailerUrl)} />
          </div>
        ) : null}
        <Button size='medium' type='success' disabled={!isFormValid} onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default MovieCreateForm;

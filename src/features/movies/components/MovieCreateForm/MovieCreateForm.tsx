import React, { useState } from 'react';
import './MovieCreateForm.scss';
import { MovieCreateDto } from 'features/movies/types/MovieCreateDto';
import { extractYoutubeVideoId } from 'features/movies/helpers/movieGetVideoIdFromTrailer';
import Input from 'common/components/UI/Input/Input';
import Button from 'common/components/UI/Button/Button';
import TextArea from 'common/components/UI/TextArea/TextArea';
import YoutubeEmbed from 'common/components/UI/YoutubeEmbed/YoutubeEmbed';
import { useNavigate } from 'react-router';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';

interface Props {
  countries: string[];
  create: (movieCreateDto: MovieCreateDto) => void;
}

const MovieCreateForm: React.FC<Props> = ({ countries, create }) => {
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
  const isFormValid =
    newMovie.name &&
    newMovie.director &&
    newMovie.distributor &&
    newMovie.country &&
    newMovie.description !== undefined &&
    newMovie.trailerUrl !== undefined &&
    Number(newMovie.duration) > 1 &&
    Number(newMovie.year) >= 2023;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setNewMovie((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (value: string): void => {
    setNewMovie((prevState) => ({ ...prevState, country: value }));
  };

  const handleSubmit = (): void => {
    create(newMovie);
    navigate('/movies');
  };

  return (
    <div className='movie-create'>
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
          {countries.length > 0 ? (
            <Dropdown
              title='Country'
              value={newMovie.country}
              options={countries}
              onChange={(value) => handleDropdownChange(value)}
            />
          ) : (
            <Input
              label='Country'
              type='text'
              name='country'
              value={newMovie.country}
              onChange={handleChange}
            />
          )}
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
        <Button size='medium' type='primary' disabled={!isFormValid} onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default MovieCreateForm;

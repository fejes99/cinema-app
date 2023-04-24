import React, { useState } from 'react';
import './MovieCreateForm.scss';
import Input from 'common/components/UI/Input/Input';
import { CreateMovieDto } from 'features/movies/types/MovieCreateDto';
import Button from 'common/components/UI/Button/Button';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setMovie((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    create(movie);
  };

  return (
    <form className='movie-create' onSubmit={handleSubmit}>
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
        <Input
          label='Description'
          type='text'
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
      <Button size='medium' type='success'>
        Create
      </Button>
    </form>
  );
};

export default MovieCreateForm;

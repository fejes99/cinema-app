import React, { useState } from 'react';
import './ProjectionCreateForm.scss';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';
import Input from 'common/components/UI/Input/Input';
import { Movie } from 'features/movies/types/Movie';
import { ProjectionType } from 'features/projectionTypes/types/ProjectionType';
import { ProjectionCreateDto } from 'features/projections/types/ProjectionCreateDto';
import { Theater } from 'features/theaters/types/Theater';
import Button from 'common/components/UI/Button/Button';

interface Props {
  movies: Movie[];
  projectionTypes: ProjectionType[];
  theaters: Theater[];
  create: (projectionCreateDto: ProjectionCreateDto) => void;
}

const ProjectionCreateForm: React.FC<Props> = ({ movies, projectionTypes, theaters, create }) => {
  const [newProjection, setNewProjection] = useState<ProjectionCreateDto>({
    time: '',
    price: 0,
    movieId: '',
    projectionTypeId: '',
    theaterId: '',
  });
  const isFormValid = Object.values(newProjection).every((value) => value !== '' && value !== 0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setNewProjection((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: string): void => {
    let id: string;
    switch (name) {
      case 'movieId':
        id = movies.find((movie) => movie.name === value)?.id || '';
        break;
      case 'projectionTypeId':
        id = projectionTypes.find((projectionType) => projectionType.name === value)?.id || '';
        break;
      case 'theaterId':
        id = theaters.find((theater) => theater.name === value)?.id || '';
        break;
      default:
        id = '';
    }
    setNewProjection((prevState) => ({ ...prevState, [name]: id }));
  };

  const handleSubmit = (): void => create(newProjection);

  return (
    <div className='projection-create'>
      <div className='projection-create__title'>Create Projection</div>
      <div className='projection-create__form'>
        <div className='projection-create__field'>
          <Input
            label='Time'
            type='datetime-local'
            name='time'
            value={newProjection.time}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
        <div className='projection-create__field'>
          <Input
            label='Price'
            type='number'
            name='price'
            value={newProjection.price}
            onChange={handleChange}
          />
        </div>
        <div className='projection-create__field'>
          <Dropdown
            title='Movies'
            value={newProjection.movieId}
            options={movies.map((movie) => movie.name)}
            onChange={(value) => handleDropdownChange('movieId', value)}
          />
        </div>
        <div className='projection-create__field'>
          <Dropdown
            title='Projection Types'
            value={newProjection.projectionTypeId}
            options={projectionTypes.map((projectionType) => projectionType.name)}
            onChange={(value) => handleDropdownChange('projectionTypeId', value)}
          />
        </div>
        <div className='projection-create__field'>
          <Dropdown
            title='Theaters'
            value={newProjection.theaterId}
            options={theaters.map((theater) => theater.name)}
            onChange={(value) => handleDropdownChange('theaterId', value)}
          />
        </div>
        <Button size='medium' type='success' disabled={!isFormValid} onClick={handleSubmit}>
          Create Projection
        </Button>
      </div>
    </div>
  );
};

export default ProjectionCreateForm;

import Input from 'common/components/UI/Input/Input';
import { ProjectionType } from 'features/projectionTypes/types/ProjectionType';
import { Projection } from 'features/projections/types/Projection';
import { ProjectionUpdateDto } from 'features/projections/types/ProjectionUpdateDto.d';
import { Theater } from 'features/theaters/types/Theater';
import React, { useState } from 'react';
import './ProjectionUpdateForm.scss';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';
import Button from 'common/components/UI/Button/Button';

interface Props {
  projection: Projection;
  projectionTypes: ProjectionType[];
  theaters: Theater[];
  update: (id: string, ProjectionUpdateDto: ProjectionUpdateDto) => void;
}

const ProjectionUpdateForm: React.FC<Props> = ({
  projection,
  projectionTypes,
  theaters,
  update,
}) => {
  console.log('🚀 ~ file: ProjectionUpdateForm.tsx:24 ~ projection:', projection);
  const [projectionUpdate, setProjectionUpdate] = useState<ProjectionUpdateDto>({
    time: projection.time,
    price: projection.price,
    projectionTypeId: projection.projectionType.id,
    theaterId: projection.theater.id,
  });
  const isFormValid =
    projectionUpdate.time &&
    Number(projection.price) > 0 &&
    projectionUpdate.projectionTypeId &&
    projectionUpdate.theaterId;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setProjectionUpdate((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: string): void => {
    const id = {
      projectionTypeId:
        projectionTypes.find((projectionType) => projectionType.name === value)?.id || '',
      theaterId: theaters.find((theater) => theater.name === value)?.id || '',
    }[name];
    console.log('🚀 ~ file: ProjectionCreateForm.tsx:41 ~ handleDropdownChange ~ id:', id);

    setProjectionUpdate((prevState) => ({ ...prevState, [name]: id }));
  };

  function getNameById(id: string, objects: { id: string; name: string }[]): string {
    const object = objects.find((obj) => obj.id === id);
    return object ? object.name : '';
  }

  const handleSubmit = (): void => update(projection.id, projectionUpdate);

  return (
    <div className='projection-update'>
      <div className='projection-update__title'>Update Projection</div>
      <div className='projection-update__form'>
        <div className='projection-update__field'>
          <Input
            label='Time'
            type='datetime-local'
            name='time'
            value={projectionUpdate.time}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
        <div className='projection-update__field'>
          <Input
            label='Price'
            type='number'
            name='price'
            value={projectionUpdate.price}
            onChange={handleChange}
          />
        </div>
        <div className='projection-update__field'>
          <Dropdown
            title='Projection Types'
            value={getNameById(projectionUpdate.projectionTypeId, projectionTypes)}
            options={projectionTypes.map((projectionType) => projectionType.name)}
            onChange={(value) => handleDropdownChange('projectionTypeId', value)}
          />
        </div>
        <div className='projection-update__field'>
          <Dropdown
            title='Theaters'
            value={getNameById(projectionUpdate.theaterId, theaters)}
            options={theaters.map((theater) => theater.name)}
            onChange={(value) => handleDropdownChange('theaterId', value)}
          />
        </div>
        <Button size='medium' type='success' disabled={!isFormValid} onClick={handleSubmit}>
          Update Projection
        </Button>
      </div>
    </div>
  );
};

export default ProjectionUpdateForm;

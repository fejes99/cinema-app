import React from 'react';
import './ProjectionFilter.scss';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';
import {
  ProjectionFilters,
  ProjectionFilterName,
  ProjectionFilterValue,
} from 'features/projections/types/ProjectionFilters.d';
import RangeSlider from 'common/components/UI/Slider/RangeSlider';
import Button from 'common/components/UI/Button/Button';

interface Props {
  movies: string[];
  theaters: string[];
  projectionTypes: string[];
  filters: ProjectionFilters;
  onFiltersChange: (name: ProjectionFilterName, value: ProjectionFilterValue) => void;
  resetFilters: () => void;
}

const ProjectionFilter: React.FC<Props> = ({
  movies,
  theaters,
  projectionTypes,
  filters: { movie, theater, projectionType, minPrice, minPriceFixed, maxPrice, maxPriceFixed },
  onFiltersChange,
  resetFilters,
}) => {
  return (
    <div className='projection-filter'>
      <div className='projection-filter__row'>
        <div className='projection-filter__filters'>
          <div className='projection-filter__filter'>
            <Dropdown
              title={ProjectionFilterName.Movie}
              value={movie}
              options={movies}
              onChange={(value) => onFiltersChange(ProjectionFilterName.Movie, value)}
            />
          </div>
          <div className='projection-filter__filter'>
            <Dropdown
              title={ProjectionFilterName.Theater}
              value={theater}
              options={theaters}
              onChange={(value) => onFiltersChange(ProjectionFilterName.Theater, value)}
            />
          </div>
          <div className='projection-filter__filter'>
            <Dropdown
              title={ProjectionFilterName.ProjectionType}
              value={projectionType}
              options={projectionTypes}
              onChange={(value) => onFiltersChange(ProjectionFilterName.ProjectionType, value)}
            />
          </div>
        </div>
        <div className='projection-filter__slider'>
          <RangeSlider
            label='Price'
            min={minPrice}
            minFixed={minPriceFixed}
            max={maxPrice}
            maxFixed={maxPriceFixed}
            step={100}
            minDistance={1}
            onChange={(minPrice, maxPrice) => {
              onFiltersChange(ProjectionFilterName.MinPrice, minPrice);
              onFiltersChange(ProjectionFilterName.MaxPrice, maxPrice);
            }}
          />
        </div>
        <div className='projection-filter__buttons'>
          <Button size='medium' type='primary' onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectionFilter;

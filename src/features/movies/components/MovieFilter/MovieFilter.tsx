import React from 'react';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';
import Search from 'common/components/UI/Search/Search';
import RangeSlider from 'common/components/UI/Slider/RangeSlider';
import './MovieFilter.scss';

interface Props {
  countries: string[];
  distributors: string[];
  minDuration: number;
  maxDuration: number;
  minYear: number;
  maxYear: number;
  onFiltersChange: (filters: object) => void;
}

const MovieFilter: React.FC<Props> = ({
  countries,
  distributors,
  minDuration,
  maxDuration,
  minYear,
  maxYear,
  onFiltersChange,
}) => {
  const handleFiltersChange = (filter: string, value: string) =>
    onFiltersChange({ [filter]: value });

  const handleSliderChange = (filter: string, minValue: number, maxValue: number) => {
    const filters = {
      [`min${filter}`]: minValue,
      [`max${filter}`]: maxValue,
    };
    onFiltersChange(filters);
  };

  return (
    <div className='movie-filter'>
      <div className='movie-filter__title'>Movies</div>
      <div className='movie-filter__search'>
        <Search onChange={(value) => handleFiltersChange('query', value)} />
      </div>
      <div className='movie-filter__filters'>
        <div className='movie-filter__filter'>
          <Dropdown
            title={'Gender'}
            options={['drama', 'comedy', 'horror']}
            onChange={(value) => handleFiltersChange('gender', value)}
          />
        </div>
        <div className='movie-filter__filter'>
          <Dropdown
            title={'Distributor'}
            options={distributors}
            onChange={(value) => handleFiltersChange('distributor', value)}
          />
        </div>
        <div className='movie-filter__filter'>
          <Dropdown
            title={'Country'}
            options={countries}
            onChange={(value) => handleFiltersChange('country', value)}
          />
        </div>
      </div>
      <div className='movie-filter__sliders'>
        <div className='movie-filter__slider'>
          <RangeSlider
            label='Duration'
            min={minDuration}
            max={maxDuration}
            step={1}
            minDistance={1}
            onChange={(min, max) => handleSliderChange('Duration', min, max)}
          />
        </div>
        <div className='movie-filter__slider'>
          <RangeSlider
            label='Year'
            min={minYear}
            max={maxYear}
            step={1}
            minDistance={0}
            onChange={(min, max) => handleSliderChange('Year', min, max)}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;

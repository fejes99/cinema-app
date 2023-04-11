import React from 'react';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';
import Search from 'common/components/UI/Search/Search';
import RangeSlider from 'common/components/UI/Slider/RangeSlider';
import './MovieFilter.scss';
import { MovieFilters, FilterName, FilterValue } from 'features/movies/types/MovieFilters.d';

interface Props {
  countries: string[];
  distributors: string[];
  filters: MovieFilters;
  onFiltersChange: (filterName: FilterName, value: FilterValue) => void;
  resetFilters: () => void;
}

const MovieFilter: React.FC<Props> = ({
  countries,
  distributors,
  filters: {
    country,
    distributor,
    minDuration,
    minDurationFixed,
    maxDuration,
    maxDurationFixed,
    minYear,
    minYearFixed,
    maxYear,
    maxYearFixed,
  },
  onFiltersChange,
  resetFilters,
}) => {
  return (
    <div className='movie-filter'>
      <div className='movie-filter__title'>Movies</div>
      <div className='movie-filter__search'>
        <Search onChange={(value) => onFiltersChange(FilterName.Query, value)} />
      </div>
      <div className='movie-filter__filters'>
        <div className='movie-filter__filter'>
          <Dropdown
            title={'Gendre'}
            value={''}
            options={['drama', 'comedy', 'horror']}
            // onChange={(value) => onFiltersChange(FilterName.Genre, value)}
            onChange={() => {}}
          />
        </div>
        <div className='movie-filter__filter'>
          <Dropdown
            title={FilterName.Distributor}
            value={distributor}
            options={distributors}
            onChange={(value) => onFiltersChange(FilterName.Distributor, value)}
          />
        </div>
        <div className='movie-filter__filter'>
          <Dropdown
            title={FilterName.Country}
            value={country}
            options={countries}
            onChange={(value) => onFiltersChange(FilterName.Country, value)}
          />
        </div>
      </div>
      <div className='movie-filter__sliders'>
        <div className='movie-filter__slider'>
          <RangeSlider
            label='Duration'
            min={minDuration}
            minFixed={minDurationFixed}
            max={maxDuration}
            maxFixed={maxDurationFixed}
            step={1}
            minDistance={1}
            onChange={(minDuration, maxDuration) => {
              onFiltersChange(FilterName.MinDuration, minDuration);
              onFiltersChange(FilterName.MaxDuration, maxDuration);
            }}
          />
        </div>
        <div className='movie-filter__slider'>
          <RangeSlider
            label='Year'
            min={minYear}
            minFixed={minYearFixed}
            max={maxYear}
            maxFixed={maxYearFixed}
            step={1}
            minDistance={0}
            onChange={(minYear, maxYear) => {
              onFiltersChange(FilterName.MinYear, minYear);
              onFiltersChange(FilterName.MaxYear, maxYear);
            }}
          />
        </div>
        <div className='movie-filter__buttons'>
          <div className='movie-filter__button' onClick={resetFilters}>
            Reset filters
          </div>
          <div className='movie-filter__button'>Sort</div>
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;

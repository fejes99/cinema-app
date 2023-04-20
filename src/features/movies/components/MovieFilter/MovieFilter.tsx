import React from 'react';
import Dropdown from 'common/components/UI/Dropdown/Dropdown';
import Search from 'common/components/UI/Search/Search';
import RangeSlider from 'common/components/UI/Slider/RangeSlider';
import './MovieFilter.scss';
import {
  MovieFilters,
  MovieFilterName,
  MovieFilterValue,
} from 'features/movies/types/MovieFilters.d';

interface Props {
  countries: string[];
  distributors: string[];
  filters: MovieFilters;
  onFiltersChange: (name: MovieFilterName, value: MovieFilterValue) => void;
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
        <Search onChange={(value) => onFiltersChange(MovieFilterName.Query, value)} />
      </div>
      <div className='movie-filter__filters'>
        <div className='movie-filter__filter'>
          <Dropdown
            title={'Gendre'}
            value={''}
            options={['drama', 'comedy', 'horror']}
            // onChange={(value) => onFiltersChange(MovieFilterName.Genre, value)}
            onChange={() => {}}
          />
        </div>
        <div className='movie-filter__filter'>
          <Dropdown
            title={MovieFilterName.Distributor}
            value={distributor}
            options={distributors}
            onChange={(value) => onFiltersChange(MovieFilterName.Distributor, value)}
          />
        </div>
        <div className='movie-filter__filter'>
          <Dropdown
            title={MovieFilterName.Country}
            value={country}
            options={countries}
            onChange={(value) => onFiltersChange(MovieFilterName.Country, value)}
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
              onFiltersChange(MovieFilterName.MinDuration, minDuration);
              onFiltersChange(MovieFilterName.MaxDuration, maxDuration);
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
              onFiltersChange(MovieFilterName.MinYear, minYear);
              onFiltersChange(MovieFilterName.MaxYear, maxYear);
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

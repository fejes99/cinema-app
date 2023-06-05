import React from 'react';
import { connect } from 'react-redux';

import { AppDispatch } from 'store/store';
import { createMovie } from '../state/movieActions';

import { MovieCreateDto } from '../types/MovieCreateDto';
import { useMovieRedirect } from '../hooks/movieRedirects';

import useFetchCountries from '../hooks/useFetchCountries';
import MovieCreateForm from '../components/MovieCreateForm/MovieCreateForm';
import Loader from 'common/components/UI/Loader/Loader';

interface Props {
  onCreateMovie: (movieCreateDto: MovieCreateDto) => void;
}

const MovieCreateContainer: React.FC<Props> = ({ onCreateMovie }) => {
  const { redirectToMovieList } = useMovieRedirect();

  // TODO: Fix CORS policy error
  const { countries, loading } = useFetchCountries();

  const handleMovieCreate = (movieCreateDto: MovieCreateDto): void => {
    onCreateMovie(movieCreateDto);
    redirectToMovieList();
  };

  // if (loading) return <Loader />;

  return (
    <>
      <div className='page-header'>Create Movie</div>
      <MovieCreateForm countries={countries ?? []} create={handleMovieCreate} />
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onCreateMovie: (movieCreateDto: MovieCreateDto) => dispatch(createMovie(movieCreateDto)),
});

export default connect(null, mapDispatchToProps)(MovieCreateContainer);

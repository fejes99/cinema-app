import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch } from 'store/store';
import { createMovie } from '../state/movieActions';
import MovieCreateForm from '../components/MovieCreateForm/MovieCreateForm';
import { CreateMovieDto } from '../types/MovieCreateDto';

interface Props {
  onCreateMovie: (createMovieDto: CreateMovieDto) => void;
}

const MovieCreateContainer: React.FC<Props> = ({ onCreateMovie }) => {
  return (
    <>
      <MovieCreateForm create={onCreateMovie} />
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onCreateMovie: (createMovieDto: CreateMovieDto) => dispatch(createMovie(createMovieDto)),
});

export default connect(null, mapDispatchToProps)(MovieCreateContainer);

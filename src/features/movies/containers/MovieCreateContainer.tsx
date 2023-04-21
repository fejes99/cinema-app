import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch } from 'store/store';
import { createMovie } from '../state/movieActions';
import MovieCreate from '../components/MovieCreate/MovieCreate';
import { CreateMovieDto } from '../types/MovieCreateDto';

interface Props {
  onCreateMovie: (createMovieDto: CreateMovieDto) => void;
}

const MovieCreateContainer: React.FC<Props> = ({ onCreateMovie }) => {
  return (
    <>
      <MovieCreate create={onCreateMovie} />
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onCreateMovie: (createMovieDto: CreateMovieDto) => dispatch(createMovie(createMovieDto)),
});

export default connect(null, mapDispatchToProps)(MovieCreateContainer);

import React from 'react';
import { Routes, Route } from 'react-router';
import MovieDetailsContainer from '../containers/MovieDetailsContainer';
import MovieListContainer from '../containers/MovieListContainer';
import MovieCreateContainer from '../containers/MovieCreateContainer';

const MoviePage: React.FC = () => (
  <Routes>
    <Route path='/' element={<MovieListContainer />} />
    <Route path=':id' element={<MovieDetailsContainer />} />
    <Route path='/create' element={<MovieCreateContainer />} />
  </Routes>
);

export default MoviePage;

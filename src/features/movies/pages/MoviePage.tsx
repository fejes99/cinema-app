import React from 'react';
import { Routes, Route } from 'react-router';
import MovieDetailsContainer from '../containers/MovieDetailsContainer';
import MovieListContainer from '../containers/MovieListContainer';
import MovieCreateContainer from '../containers/MovieCreateContainer';
import MovieUpdateContainer from '../containers/MovieUpdateContainer';

const MoviePage: React.FC = () => (
  <Routes>
    <Route path='/' element={<MovieListContainer />} />
    <Route path=':id' element={<MovieDetailsContainer />} />
    <Route path=':id/edit' element={<MovieUpdateContainer />} />
    <Route path='/create' element={<MovieCreateContainer />} />
  </Routes>
);

export default MoviePage;

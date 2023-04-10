import React from 'react';
import { Routes, Route } from 'react-router';
import MovieDetailsContainer from '../containers/MovieDetailsContainer';
import MovieListContainer from '../containers/MovieListContainer';

const MoviePage: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MovieListContainer />} />
        <Route path=':id' element={<MovieDetailsContainer />} />
      </Routes>
    </>
  );
};

export default MoviePage;

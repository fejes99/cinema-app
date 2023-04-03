import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import './App.scss';
import Header from './common/components/UI/Header/Header';
import HomePage from './pages/home/HomePage';
import MoviePage from './pages/movies/MoviePage';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movies' element={<MoviePage />} />
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Routes>
    </div>
  );
};

export default App;

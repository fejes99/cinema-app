import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import './App.scss';
import Header from 'common/components/UI/Header/Header';
import HomePage from 'pages/home/HomePage';
import MoviePage from 'features/movies/pages/MoviePage';
import LoginPage from 'features/auth/pages/LoginPage';
import ProfilePage from 'features/auth/pages/ProfilePage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import ProjectionPage from 'features/projections/pages/ProjectionPage';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Header />
      <div className='main'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies/*' element={<MoviePage />} />
          <Route path='/projections' element={<ProjectionPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<Navigate to={'/'} replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

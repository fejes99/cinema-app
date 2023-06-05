import React from 'react';
import './Header.scss';
import Logo from './Logo/Logo';
import Navbar from './Navbar/Navbar';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <Logo />
        <div className='header__title'>CinePass</div>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;

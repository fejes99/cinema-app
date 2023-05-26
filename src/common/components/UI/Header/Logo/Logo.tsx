import React from 'react';
import { useNavigate } from 'react-router';
import './Logo.scss';

const Logo: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    navigate('/');
  };

  return (
    <img
      className='header__logo'
      src={require('common/assets/logo-image.png')}
      alt='Logo'
      onClick={handleClick}
    />
  );
};

export default Logo;

import React from 'react';
import './Navbar.scss';
import NavbarItem from './NavbarItem/NavbarItem';
import { NavbarItemProps } from './NavbarItem/NavbarItem.d';

const Navbar: React.FC = () => {
  const navbarItems: NavbarItemProps[] = [
    { name: 'Projections', url: '/projections' },
    { name: 'Movies', url: '/movies' },
    { name: 'Users', url: '/users' },
    { name: 'Login', url: '/login' },
    { name: 'Register', url: '/register' },
    { name: 'Profile', url: '/profile' },
  ];

  return (
    <div className='navbar'>
      {navbarItems.map((item: NavbarItemProps) => (
        <NavbarItem key={item.name} {...item} />
      ))}
    </div>
  );
};

export default Navbar;
